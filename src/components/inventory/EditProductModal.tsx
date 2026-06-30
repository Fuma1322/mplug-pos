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
import { tauri } from "@/lib/tauri";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  min_stock: number;
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setStock(product.stock);
      setMinStock(product.min_stock);
    }
  }, [product]);

  async function handleUpdate() {
    if (!product) return;

    try {
      setLoading(true);

      await tauri.updateProduct({
      id: product.id,
      name,
      price,
      stock,
      min_stock: minStock,
    });

      toast.success("Product updated successfully");

      onUpdated?.();
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl bg-white border border-gray-100 shadow-xl">

        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-[#111111]">
            Edit Product
          </DialogTitle>

          <p className="text-xs text-gray-400">
            Update product details in your inventory
          </p>
        </DialogHeader>

        <div className="space-y-4 mt-4">

          <input
            className="w-full h-11 px-3 rounded-lg border border-gray-200 text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product name"
          />

          <input
            type="number"
            className="w-full h-11 px-3 rounded-lg border border-gray-200 text-sm"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Price"
          />

          <input
            type="number"
            className="w-full h-11 px-3 rounded-lg border border-gray-200 text-sm"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            placeholder="Stock"
          />

          <input
            type="number"
            className="w-full h-11 px-3 rounded-lg border border-gray-200 text-sm"
            value={minStock}
            onChange={(e) => setMinStock(Number(e.target.value))}
            placeholder="Min Stock"
          />

          <Button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full h-11 rounded-lg bg-[#25D366] text-white font-medium"
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>

        </div>
      </DialogContent>
    </Dialog>
  );
}