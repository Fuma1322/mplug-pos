import { invoke } from "@tauri-apps/api/core";

 type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  min_stock: number;
  created_at: string;
};

export const tauri = {
 addProduct: (data: {
  name: string;
  price: number;
  stock: number;
  minStock: number;
}) =>
  invoke("add_product", {
    name: data.name,
    price: data.price,
    stock: data.stock,
    minStock: data.minStock,
  }),

  updateProduct: (data: {
    id: string;
    name: string;
    price: number;
    stock: number;
    min_stock: number;
  }) => invoke("update_product", data),

  deleteProduct: (id: string) =>
    invoke("delete_product", { id }),

getProducts: () =>
  invoke<Product[]>("get_products"),
};