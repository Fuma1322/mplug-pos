"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!name || !price || !stock) return;

    try {
      setLoading(true);

      await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price: Number(price),
          stock: Number(stock),
        }),
      });

      setName("");
      setPrice("");
      setStock("");

      window.location.reload();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full md:w-auto">
      {/* WRAPPER */}
      <div className="flex flex-col md:flex-row gap-2 md:items-center">

        {/* NAME */}
        <input
          className="h-10 w-full md:w-48 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20 transition"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* PRICE */}
        <input
          className="h-10 w-full md:w-28 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20 transition"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        {/* STOCK */}
        <input
          className="h-10 w-full md:w-28 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20 transition"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        {/* BUTTON */}
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="h-10 w-full md:w-auto px-5 rounded-lg bg-[#25D366] text-white font-medium hover:bg-[#1ebe5d] transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Adding..." : "Add Product"}
        </Button>

      </div>
    </div>
  );
}