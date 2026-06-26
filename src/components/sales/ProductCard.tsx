"use client";

import { Product } from "@/types/products";

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export default function ProductCard({
  product,
  onClick,
}: ProductCardProps) {
  return (
    <button
      onClick={() => onClick(product)}
      className="w-full rounded-lg border bg-white p-4 text-left shadow-sm transition hover:border-blue-500 hover:shadow-md"
    >
      <h3 className="font-semibold text-lg">{product.name}</h3>

      <div className="mt-3 flex items-center justify-between">
        <span className="font-bold text-green-600">
          M{product.price.toFixed(2)}
        </span>

        <span
          className={`text-sm ${
            product.stock <= 5
              ? "text-red-500"
              : "text-gray-500"
          }`}
        >
          Stock: {product.stock}
        </span>
      </div>
    </button>
  );
}