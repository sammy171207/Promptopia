# My Promptopia Project

Welcome to the Promptopia project, a Next.js application that allows users to share creative prompts, explore inspiring ideas, and connect with a community of creators.

## Live Demo

Check out the live site: [Live Demo](https://your-live-link.com)

## Features

- User Authentication with NextAuth & Google OAuth
- Create, edit, and delete prompts
- Dynamic user profiles and personalized content
- Responsive design with Tailwind CSS
- Real-time data fetching with Next.js

## Technologies Used

- Next.js (App Router)
- MongoDB
- NextAuth
- Tailwind CSS

## Setup Instructions

1. Clone the repository.
2. Run `npm install` to install all dependencies.
3. Create a `.env` file at the root with the required environment variables (see sample below).
4. Run `npm run dev` to start the development server.

### Sample Environment Variables (.env)

```properties
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_URL_INTERNAL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

## API Endpoints

- `/api/prompt`: Endpoint to fetch and manage prompts.
- `/api/auth`: Authentication endpoints handled by NextAuth.

## Contributing

Contributions are welcome! Fork the repository, create a feature branch, and open a pull request.

## License

This project is licensed under the MIT License.

---

Enjoy the experience and happy prompting!
