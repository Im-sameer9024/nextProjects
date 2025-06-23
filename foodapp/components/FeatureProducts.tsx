import React from 'react'
import ProductCard from './Cards/ProductCard'
import { ProductTypesProps } from '@/types/type'

const FeatureProducts = ({products}:{products:ProductTypesProps[]}) => {
  return (
    <div className=' w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {
        products.map((product)=>{
            return <ProductCard key={product.id} product={product} />
        })
      }
    </div>
  )
}

export default FeatureProducts
