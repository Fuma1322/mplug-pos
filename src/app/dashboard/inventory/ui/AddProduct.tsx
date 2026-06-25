"use client";

import { useState } from "react";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  async function handleSubmit() {
    await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify({
        name,
        price: Number(price),
        stock: Number(stock),
      }),
    });

    window.location.reload();
  }

  return (
    <div className="flex gap-2">
      <input
        className="border p-2 rounded"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border p-2 rounded w-24"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        className="border p-2 rounded w-24"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-black text-white px-4 rounded"
      >
        Add
      </button>
    </div>
  );
}