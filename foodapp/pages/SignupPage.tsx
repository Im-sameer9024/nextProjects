import SignupForm from '@/components/Forms/SignupForm'
import { User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const SignupPage = () => {
  return (
    <div className=" h-[calc(100vh-80px)] flex justify-center items-center">
      <div className=" w-[90%] sm:w-[50%] lg:w-[33%] flex flex-col items-center gap-8">
        <h2 className=" flex items-center gap-2 font-semibold">
          <User /> Register as User
        </h2>

        <SignupForm />
          <div>
            <p>
                I have an account? <Link href="/login" className=" text-blue-500 hover:underline">Log In</Link>
            </p>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
