import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth'
import { signIn, signUp } from '@/server/users'
import { headers } from 'next/headers'
import Link from 'next/link'
import React from 'react'

const page = async () => {


  const session = await auth.api.getSession({
    headers: await headers()
  })


  return (
    <div className='h-screen flex flex-col justify-center items-center gap-5 text-black bg-black '>
      {/* <button className='bg-green-300 p-2 rounded-2xl text-md font-semibold px-8' onClick={signUp}>Sign Up</button> */}
      {!session ? <p className='text-emerald-400 font-medium text-xl uppercase'>Not Signed In</p> : <p className='text-emerald-400 font-medium text-xl uppercase'>Hello {session.user.name}</p>}
      <Link href='sign-in'>
        <Button className='bg-red-300 hover:bg-green-500'>Sign In</Button>
      </Link>
    </div>
  )
}

export default page