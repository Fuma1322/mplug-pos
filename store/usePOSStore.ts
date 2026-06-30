import { create } from "zustand";
import { tauri } from "@/lib/tauri";
import type { Product } from "@/types/products";

type POSState = {
  products: Product[];

  setProducts: (products: Product[]) => void;

  refreshProducts: () => Promise<void>;

  addProduct: (data: {
    name: string;
    price: number;
    stock: number;
    minStock: number;
  }) => Promise<void>;

  updateProduct: (data: {
    id: string;
    name: string;
    price: number;
    stock: number;
    min_stock: number;
  }) => Promise<void>;

  deleteProduct: (id: string) => Promise<void>;
};

export const usePOSStore = create<POSState>((set, get) => ({
  products: [],

  setProducts: (products) => set({ products }),

  refreshProducts: async () => {
    const data = await tauri.getProducts();
    set({ products: data as Product[] });
  },

  addProduct: async (data) => {
    await tauri.addProduct(data);
    await get().refreshProducts();
  },

  updateProduct: async (data) => {
    await tauri.updateProduct(data);
    await get().refreshProducts();
  },

  deleteProduct: async (id) => {
    await tauri.deleteProduct(id);
    await get().refreshProducts();
  },
}));