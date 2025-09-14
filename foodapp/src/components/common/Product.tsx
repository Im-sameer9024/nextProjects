import type { Product } from '@prisma/client'
import React from 'react'

const Product = ({product}:{product:Product}) => {

  console.log(product)

  return (
    <div>
      {product.description}
    </div>
  )
}

export default Product
