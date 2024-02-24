import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import CreatePostComponent from "../../components/CreatePost"
import { signIn } from 'next-auth/react'


export default async function CreatePost() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return(<div className='p-8 text-center'>Please Sign In to Continue</div>)
  }
  else
  return (<CreatePostComponent />);
}