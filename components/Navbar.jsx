'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState,useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
const Navbar = () => {
  const {data:session}=useSession();
  const isUserLoggedIn=!!session?.user;
  const [provider,setProvider]=useState(null);
  const [toggleDropdown,setToggleDropdown]=useState(false);
  useEffect(()=>{
    const setUpProviders=async()=>{
      const response=await getProviders();
      setProvider(response);
    }
    setUpProviders();
  },[]) 
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className="flex gap-2 flex-center">
       <Image src={"/assets/images/logo.svg"} alt="Promptopic Logo" width={30} height={30} className="object-contain" />
       <p className="logo_text">Promptopia</p>
      </Link>
      {/* //Mobile Navigation */}
      <div className='sm:flex hidden'>
        {isUserLoggedIn?
        (<div className='flex gap-3 md:gap-5'>
          <Link href="/create-prompt" className="black_btn">Create Post</Link>
          <button type='button' onClick={signOut} className='outline_btn'>Sign Out</button>
          <Link href="/profile" className='black_btn'>
            <Image src={session?.user.image} width={37} height={37} className='rounded-full' alt='profile' onClick={()=>{setToggleDropdown((prev)=>(!prev))}} /></Link>
        </div>):
        (<>
         {provider && Object.values(provider).map((provider)=>{
          return(
            <button type='button' key={provider.name} onClick={()=>signIn(provider.id)} className='black_btn'>Sign In</button>
          )
         })}
        </>)}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex-relative'>
        {isUserLoggedIn?(<div className='flex '>
          <Image src={session?.user.image} width={37} height={37} className='rounded-full' alt='profile'  onClick={()=>{setToggleDropdown((prev)=>(!prev))}}/>
          {toggleDropdown && (<div className='dropdown'>
             <Link href="/profile" className='dropdown_list' onClick={()=>setToggleDropdown(false)}>My Profile</Link>
             <Link href="/create-prompt" className='dropdown_list' onClick={()=>setToggleDropdown(false)}>Create Prompt</Link>
             <button type='button' className='dropdown_list' 
             onClick={()=>{setToggleDropdown(false);signOut()}}>Sign Out</button>
          </div>)}
        </div>):(<>
        {provider && Object.values(provider).map((provider)=>{
          return(
            <button type='button' key={provider.name} onClick={()=>signIn(provider.id)} className='black_btn'>Sign In</button>
          )
         })}
        </>)
        }</div>
    </nav>
  )
}

export default Navbar