"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import AddProduct from "./AddProduct";
import EditProductModal from "@/components/inventory/EditProductModal";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  minStock: number;
  createdAt: string;
};

export default function InventoryClient({
  products,
}: {
  products: Product[];
}) {
  const router = useRouter();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  async function deleteProduct(id: string) {
    try {
      await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      toast.success("Product deleted");
      router.refresh();
    } catch (err) {
      toast.error("Failed to delete product");
    }
  }

  function handleEdit(product: Product) {
    setSelectedProduct(product);
    setEditOpen(true);
  }

  function closeEdit() {
    setEditOpen(false);
    setSelectedProduct(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-6 space-y-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-[#111111]">
            Inventory
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage stock across MaseruPlug POS
          </p>
        </div>

        <AddProduct />
      </div>

      {/* GRID */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

        {products.map((product) => {
          const lowStock = product.stock <= product.minStock;

          const stockRatio = Math.min(
            product.stock / Math.max(product.minStock * 3, 1),
            1
          );

          return (
            <Card
              key={product.id}
              className="group relative overflow-hidden p-2 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all"
            >

              {/* HEADER */}
              <CardHeader className="space-y-2">

                <div className="flex items-start justify-between gap-3">

                  <CardTitle className="text-base font-semibold text-[#111111] leading-snug break-words group-hover:text-[#25D366] transition-colors pr-2">
                    {product.name}
                  </CardTitle>

                  {lowStock ? (
                    <Badge className="bg-red-50 text-red-600 rounded-full border border-red-100">
                      Low Stock
                    </Badge>
                  ) : (
                    <Badge className="bg-[#25D366]/10 text-[#25D366] rounded-full border border-[#25D366]/20">
                      Healthy
                    </Badge>
                  )}

                </div>

                <p className="text-xs text-gray-400">
                  Added {new Date(product.createdAt).toLocaleDateString()}
                </p>

              </CardHeader>

              {/* BODY */}
              <CardContent className="space-y-5">

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">Price</p>
                    <p className="text-xl font-bold text-[#25D366]">
                      M{product.price}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-400">Stock</p>
                    <p className="text-xl font-bold text-[#111111]">
                      {product.stock}
                    </p>
                  </div>
                </div>

                <div className="h-2 w-full bg-gray-100 rounded-2xl overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      lowStock ? "bg-red-500" : "bg-[#25D366]"
                    }`}
                    style={{ width: `${stockRatio * 100}%` }}
                  />
                </div>

                {/* ACTIONS */}
                <div className="flex items-center justify-between pt-2">

                  <Button
                    onClick={() => handleEdit(product)}
                    className="text-sm items-center gap-2 text-gray-500 hover:text-[#25D366] transition"
                  >
                    <Pencil size={16} />
                    Edit
                  </Button>

                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>

                </div>

              </CardContent>
            </Card>
          );
        })}

      </div>

      {/* EDIT MODAL (FIXED PROPERLY) */}
      {selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          open={editOpen}
          onOpenChange={(open) => {
            setEditOpen(open);
            if (!open) setSelectedProduct(null);
          }}
          onUpdated={() => router.refresh()}
        />
      )}

    </div>
  );
}