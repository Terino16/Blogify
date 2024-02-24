/* eslint-disable @next/next/no-img-element */
"use client"
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  return (
 <header
className=" md:mt-5 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-black py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
<div className="px-4">
    <div className="flex items-center justify-between">
        <div className="flex shrink-0">
            <a aria-current="page" className="flex items-center" href="/">
                <img className="h-11 w-auto" src="/logo.png"  alt="Logo"/>
                <p className="sr-only text-white">Website Title</p>
            </a>
        </div>
        <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
            <Link aria-current="page"
                className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-50 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                href="/dashboard">DashBoard</Link>
                 <Link className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-50 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                href={"/create-post"}>Create</Link>
        </div>
        <div className="flex items-center space-x-3">
        {session ? (
          <>
            <img src={session?.user?.image || ""} alt="User" width={40} height={20} className="rounded-xl" />
            <button onClick={() => signOut()} className="bg-red-600 text-white p-2 rounded-xl">Sign out</button>
          </>
        ) : (
          <>
            <button onClick={() => signIn()} className="p-2 bg-purple-600 text-white font-bold rounded-xl">Sign in</button>
        
          </>
        )}
      </div>
    </div>
</div>
</header> 
  );
};

export default Navbar;
