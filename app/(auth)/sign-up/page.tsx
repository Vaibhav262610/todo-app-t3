"use client"

import React, { useState } from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth'
import { signUp } from '@/server/users'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'


const SignUp = () => {


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter()


     const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Logging in:', name, email, password);
        await signUp(name,email,password);
        toast.success("Account Created Successfully!")
        router.push('/dashboard')

      };

  return (
    <Card className='w-full max-w-md mx-auto'>
        <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Create your account to get started.</CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium">Name</label>
                        <Input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="john wick"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Email</label>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john@wick.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Password</label>
                        <Input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                        />
                      </div>
                      <Button className="w-full" type="submit">
                        Submit
                      </Button>
                    </form>
        </CardContent>
        <CardFooter className='flex justify-center'>
            <p className='text-sm text-muted-foreground'>Already have an account? <Link className='font-medium text-primary hover:underline' href={'/sign-in'}>Sign in</Link></p>
        </CardFooter>
    </Card>
  )
}

export default SignUp