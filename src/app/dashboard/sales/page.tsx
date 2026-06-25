"use client";

import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
};

type CartItem = {
  product: Product;
  quantity: number;
};

export default function SalesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    fetch("/api/products/list")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  function addToCart(product: Product) {
    setCart((prev) => {
      const exists = prev.find((p) => p.product.id === product.id);

      if (exists) {
        return prev.map((p) =>
          p.product.id === product.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }

      return [...prev, { product, quantity: 1 }];
    });
  }

  function removeFromCart(id: string) {
    setCart((prev) => prev.filter((p) => p.product.id !== id));
  }

  function total() {
    return cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }

  async function checkout(type: "CASH" | "CREDIT") {
    await fetch("/api/sales", {
      method: "POST",
      body: JSON.stringify({ cart, type }),
    });

    setCart([]);
    alert("Sale completed");
  }

  return (
    <div className="p-6 grid grid-cols-3 gap-6">

      {/* PRODUCTS */}
      <div className="col-span-2">
        <h2 className="text-xl font-bold mb-4">Products</h2>

        <div className="grid gap-2">
          {products.map((p) => (
            <div
              key={p.id}
              className="border p-3 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{p.name}</p>
                <p className="text-sm text-gray-500">
                  M{p.price} | Stock: {p.stock}
                </p>
              </div>

              <button
                onClick={() => addToCart(p)}
                className="bg-black text-white px-3 py-1 rounded"
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CART */}
      <div className="border p-4">
        <h2 className="text-xl font-bold mb-4">Cart</h2>

        {cart.map((item) => (
          <div
            key={item.product.id}
            className="flex justify-between mb-2"
          >
            <p>
              {item.product.name} x {item.quantity}
            </p>

            <button
              onClick={() => removeFromCart(item.product.id)}
              className="text-red-500"
            >
              X
            </button>
          </div>
        ))}

        <hr className="my-2" />

        <p className="font-bold">Total: M{total()}</p>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => checkout("CASH")}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Cash
          </button>

          <button
            onClick={() => checkout("CREDIT")}
            className="bg-orange-500 text-white px-3 py-1 rounded"
          >
            Credit
          </button>
        </div>
      </div>
    </div>
  );
}