"use client"
import FeatureProducts from '@/components/FeatureProducts'
import Header from '@/components/Header/Header'
import { ProductTypesProps } from '@/types/type'
import React from 'react'

const HomePage = ({products}:{products:ProductTypesProps[]}) => {


 

  return (
    <main className=' my-10'>
      <Header/>
      <FeatureProducts products={products} />
    </main>
  )
}

export default HomePage
