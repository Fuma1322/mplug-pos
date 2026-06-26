"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  minStock: number;
};

type Props = {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated?: () => void;
};

export default function EditProductModal({
  product,
  open,
  onOpenChange,
  onUpdated,
}: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [minStock, setMinStock] = useState(0);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setStock(product.stock);
      setMinStock(product.minStock);
    }
  }, [product]);

  async function handleUpdate() {
    try {
      if (!product) return;

      await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price,
          stock,
          minStock,
        }),
      });

      toast.success("Product updated successfully");

      onUpdated?.();
      onOpenChange(false);
    } catch (err) {
      toast.error("Failed to update product");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl bg-white border border-gray-100 shadow-xl">

        {/* HEADER */}
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-[#111111]">
            Edit Product
          </DialogTitle>

          <p className="text-xs text-gray-400">
            Update product details in your inventory
          </p>
        </DialogHeader>

        {/* FORM */}
        <div className="space-y-4 mt-4">

          {/* NAME */}
          <div className="space-y-1">
            <label className="text-xs text-gray-500">Product Name</label>
            <input
              className="w-full h-11 px-3 rounded-lg border border-gray-200 bg-white text-sm
                         focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 focus:border-[#25D366]
                         transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product name"
            />
          </div>

          {/* PRICE */}
          <div className="space-y-1">
            <label className="text-xs text-gray-500">Price (M)</label>
            <input
              className="w-full h-11 px-3 rounded-lg border border-gray-200 bg-white text-sm
                         focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 focus:border-[#25D366]
                         transition"
              value={price}
              type="number"
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="Price"
            />
          </div>

          {/* STOCK */}
          <div className="space-y-1">
            <label className="text-xs text-gray-500">Stock Quantity</label>
            <input
              className="w-full h-11 px-3 rounded-lg border border-gray-200 bg-white text-sm
                         focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 focus:border-[#25D366]
                         transition"
              value={stock}
              type="number"
              onChange={(e) => setStock(Number(e.target.value))}
              placeholder="Stock"
            />
          </div>

          {/* MIN STOCK */}
          <div className="space-y-1">
            <label className="text-xs text-gray-500">Minimum Stock</label>
            <input
              className="w-full h-11 px-3 rounded-lg border border-gray-200 bg-white text-sm
                         focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 focus:border-[#25D366]
                         transition"
              value={minStock}
              type="number"
              onChange={(e) => setMinStock(Number(e.target.value))}
              placeholder="Min Stock"
            />
          </div>

          {/* BUTTON */}
          <Button
            onClick={handleUpdate}
            className="w-full h-11 rounded-lg bg-[#25D366] hover:bg-[#1faa55] text-white font-medium transition"
          >
            Save Changes
          </Button>

        </div>
      </DialogContent>
    </Dialog>
  );
}