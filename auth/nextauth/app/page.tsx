import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const Home = async() => {

  const session = await auth()

  if(!session){
    redirect('/login')
  }


  return (
    <div>
      Home
    </div>
  )
}

export default Home
