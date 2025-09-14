import Product from "@/components/common/Product";
import axios from "axios";
import React from "react";

const SingleProduct = async ({ params }: { params: { productId: string } }) => {
  const { productId } = await params;

  console.log("productId",productId)

  const res = await axios.get(
    `http://localhost:3000/api/products/${productId}`
  );

  console.log("in the singleProduct component", res);

  return (
    <div>
      <Product product={res.data.products} />
    </div>
  );
};

export default SingleProduct;
