"use client"

import React from 'react'
import { authClient } from '@/lib/auth-client'
import { Button } from './ui/button'

const SignOut = () => {
  return (
    // <button className='bg-red-300 cursor-pointer p-2 rounded-2xl text-md font-semibold px-8' onClick={()=> authClient.signOut()}>Sign Out</button>
    <Button onClick={()=> authClient.signOut()}>Log Out</Button>
  )
}

export default SignOut