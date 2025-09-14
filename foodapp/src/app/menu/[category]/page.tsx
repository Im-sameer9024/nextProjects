import Category from '@/components/core/Menu/Category'
import axios from 'axios'
import React from 'react'

const SingleCategory = async({params}:{  params:{category:string}}) => {

 const {category} = await params


 console.log("single category",category)



  const res = await axios.get(`http://localhost:3000/api/products?cat=${category}`)

  

 if(!res.data?.success){
    return (
      <div className=" w-full flex p-6 rounded-3xl border border-gray-500 items-center justify-center">
        <p>Failed to load categories</p>
      </div>
    )
  }

   if(res.data?.products?.length < 1){
    return (
      <div className=" w-full flex p-6 rounded-3xl border border-gray-500 items-center justify-center">
        <p>No categories found</p>
      </div>
    )
  }



  return (
    <div>
      {category}
      <Category products={res.data?.products} />
    </div>
  )
}

export default SingleCategory
