import { Product } from "@prisma/client";
import React from "react";
import ProductCard from "../Cards/ProductCard";

const CategoryProducts = ({ products }: { products: Product[] }) => {
  return (
    <div className=" w-10/12 mx-auto min-h-screen my-10 grid grid-cols-3 ">
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};

export default CategoryProducts;
