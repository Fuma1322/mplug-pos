"use client";

import ProductCard from "./ProductCard";
import { Product } from "@/types/products";

interface ProductGridProps {
  products: Product[];
  onSelect: (product: Product) => void;
}

export default function ProductGrid({
  products,
  onSelect,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-lg border p-10 text-center text-gray-500">
        No products found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={onSelect}
        />
      ))}
    </div>
  );
}