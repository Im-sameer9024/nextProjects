import ProductCard from "@/components/common/ProductCard";
import type { Product } from "@prisma/client";
import React from "react";

const BestSeller = ({ products }: { products: Product[] }) => {

  return (
    <div>
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};

export default BestSeller;
