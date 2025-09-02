import BestSeller from '@/components/Home/BestSeller'
import BottomBanner from '@/components/Home/BottomBanner'
import Categories from '@/components/Home/Categories'
import MainBanner from '@/components/Home/MainBanner'
import NewsLetter from '@/components/Home/NewsLetter'
import type { Category } from '@prisma/client'
import React from 'react'

const HomePage = ({categories}:{categories: Category[]}) => {
  return (
    <main className=' w-full px-2 sm:px-0 sm:w-10/12 mx-auto my-10'>
      <MainBanner/>
      <Categories categories={categories}/>
      <BestSeller/>
      <BottomBanner/>
      <NewsLetter/>
    </main>
  )
}

export default HomePage
