import connectToDB from "@/utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";

// console.log(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await session.user;
            const user = await User.findOne({ email: sessionUser.email });
            session.user.id = user._id.toString();
            return session;
        },
        async signIn({ profile }) {
            console.log('//SignIn Fn Run')
            try {
                await connectToDB();
                const userExists = await User.findOne({ email: profile.email });
                if (!userExists) {
                        const username = profile.name && profile.name.trim() !== ''
                        ? profile.name.replace(/\s+/g, "").toLowerCase()
                        : profile.email.split("@")[0];
                        console.log('username', username);  
                    await User.create({
                        email: profile.email,
                        username: username,
                        image: profile.picture,
                    });
                }
                return true;
            } catch (error) {
                console.log('//SignIn Fn Error')
                console.log(error);
                return false;
            }
        },

    },
    
})

export { handler as GET, handler as POST }