import BestSeller from '@/components/core/Home/BestSeller'
import Header from '@/components/core/Home/Header'
import React from 'react'
import { prisma } from '../lib/prisma'
import axios from 'axios'

const Home = async() => {

  //---------------------- all products is fetched ---------------------------- 

  const res = await axios.get("http://localhost:3000/api/products")


  return (
    <main className='lg:px-18 md:px-16 sm:px-14 px-4 py-4 w-full mx-auto flex flex-col lg:gap-28 md:gap-20 sm:gap-10 gap-6'>
      <Header/>
      <BestSeller products={res.data?.products} />
      
    </main>
  )
}

export default Home
