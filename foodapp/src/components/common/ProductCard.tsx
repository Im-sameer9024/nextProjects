import type { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="font-sans  bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 max-w-[350px] w-[300px]">
      <Link href={`/products/${product.id}`}>
        {/* Product Image */}
        <div className="relative h-48 w-full">
          <Image
            src={product?.img ?? "/placeholder.png"}
            alt={product.title || "Product image"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Product Details */}
        <div className="p-4">
          {/* Title */}
          <h2 className="font-semibold text-gray-800 text-lg mb-1 line-clamp-1">
            {product.title}
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 h-10">
            {product.description}
          </p>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between">
            <p className="font-mono text-lg font-bold text-gray-900">
              ${product.price}
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded text-sm transition-colors hover:cursor-pointer">
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
