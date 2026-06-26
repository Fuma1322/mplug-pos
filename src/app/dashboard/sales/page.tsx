"use client"

import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { checkoutSale } from "@/actions/sales";
import type { Product } from "@/types/products";
import { Button } from "@/components/ui/button";

export default function SalesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const cart = useCart();

  // Load products
  useEffect(() => {
    fetch("/api/products/list")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  const cartCount = useMemo(() => {
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart.items]);

  async function checkout(type: "CASH" | "CREDIT") {
    try {
      setLoading(true);

      await checkoutSale(cart.items, type);

      cart.clearCart();
      alert("Sale completed successfully");
    } catch (error) {
      console.error(error);
      alert("Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-12 gap-4 p-6 h-screen bg-gray-50">

      {/* PRODUCTS */}
      <div className="col-span-8 flex flex-col">

        {/* HEADER / SEARCH */}
        <div className="mb-4">
          <h1 className="text-xl font-bold text-[#111111]">
            Point of Sale
          </h1>

          <p className="text-sm text-gray-500 mb-3">
            Select products to add to cart
          </p>

          <input
            className="w-full h-11 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20 transition"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 py-2 overflow-auto pr-1">

          {filteredProducts.map((p) => (
            <Button
              key={p.id}
              onClick={() => cart.addItem(p)}
              disabled={p.stock <= 0}
              className={`h-full w-full flex flex-col items-start justify-between text-left rounded-xl border bg-white p-4 transition-all
                hover:shadow-lg hover:-translate-y-0.5
                active:scale-[0.98]
                ${
                  p.stock <= 0
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:border-[#25D366]"
                }`}
            >
              <div className="w-full space-y-1">
                <p className="font-semibold text-[#111111] line-clamp-1">
                  {p.name}
                </p>

                <p className="text-sm font-medium text-[#25D366]">
                  M{p.price}
                </p>

                <p
                  className={`text-xs font-medium mt-2 ${
                    p.stock <= 5 ? "text-red-500" : "text-gray-500"
                  }`}
                >
                  Stock: {p.stock}
                </p>
                </div>
            </Button>
          ))}

        </div>
      </div>

      {/* CART */}
       <div className="col-span-4 flex flex-col border border-[#111111]/20 rounded-xl bg-white h-full overflow-hidden shadow-sm">

        {/* HEADER */}
        <div className="p-4 border-b border-[#111111]/10">
          <h2 className="font-bold text-lg text-[#111111]">
            Cart ({cartCount})
          </h2>
        </div>

        {/* ITEMS (SCROLLABLE) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {cart.items.length === 0 && (
            <p className="text-gray-400 text-sm">
              Cart is empty
            </p>
          )}

          {cart.items.map((item) => (
            <div
              key={item.id}
              className="border border-[#111111]/10 rounded-lg p-3"
            >
              <div className="flex justify-between">
                <p className="font-medium text-[#111111]">
                  {item.name}
                </p>

                <button
                  onClick={() => cart.removeItem(item.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  ✕
                </button>
              </div>

              <div className="flex items-center justify-between mt-2 text-sm">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => cart.decreaseQty(item.id)}
                    className="px-2 border rounded hover:border-[#25D366]"
                  >
                    -
                  </button>

                  <p>{item.quantity}</p>

                  <button
                    onClick={() => cart.increaseQty(item.id)}
                    className="px-2 border rounded hover:border-[#25D366]"
                  >
                    +
                  </button>
                </div>

                <p className="font-semibold text-[#111111]">
                  M{item.price * item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CHECKOUT (FIXED AT BOTTOM) */}
        <div className="border-t border-[#111111]/10 p-4 space-y-3 bg-white">

          <p className="font-bold text-lg text-[#111111]">
            Total: M{cart.total()}
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => checkout("CASH")}
              disabled={cart.items.length === 0}
              className="bg-[#25D366] hover:bg-[#1ebe5d] cursor-pointer text-white w-full p-3 rounded-lg font-semibold disabled:opacity-50"
            >
              CASH
            </button>

            <button
              onClick={() => checkout("CREDIT")}
              disabled={cart.items.length === 0}
              className="bg-[#111111] hover:opacity-90 cursor-pointer text-white w-full p-3 rounded-lg font-semibold disabled:opacity-50"
            >
              CREDIT
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}