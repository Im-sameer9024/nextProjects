import React from 'react'


interface ProductParamsTypeProps{
    params:Promise<{productId:string}>
}


const SingleProductPage = ({params}:{params:ProductParamsTypeProps}) => {

    console.log("params", params)
  return (
    <div>
      Product Page
    </div>
  )
}

export default SingleProductPage
