"use client";

import { useEffect } from "react";
import InventoryClient from "./ui/InventoryClient";
import { tauri } from "@/lib/tauri";
import { usePOSStore } from "../../../../store/usePOSStore";
import type { Product } from "@/types/products";

export default function InventoryPage() {
  const { products, setProducts, refreshProducts } = usePOSStore();

useEffect(() => {
  refreshProducts();
}, [refreshProducts]);

  useEffect(() => {
    (async () => {
      const data = await tauri.getProducts();
      setProducts(data as Product[]);
    })();
  }, [setProducts]);

  return (
    <InventoryClient />
  );
}