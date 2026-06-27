"use client"

import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { checkoutSale } from "@/actions/sales";
import type { Product } from "@/types/products";
import { Button } from "@/components/ui/button";
import CreditCheckoutModal from "@/components/sales/CreditCheckoutModal";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function SalesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [cashOpen, setCashOpen] = useState(false);
  const [cashReceived, setCashReceived] = useState("");

  const [creditOpen, setCreditOpen] = useState(false);

  const cart = useCart();

  useEffect(() => {
    fetch("/api/products/list")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  const change = useMemo(() => {
  const received = Number(cashReceived || 0);
  return received - cart.total();
}, [cashReceived, cart.items]);

  const cartCount = useMemo(() => {
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart.items]);

    async function checkout(type: "CASH" | "CREDIT") {
      try {
        setLoading(true);

        if (type === "CREDIT") {
          setCreditOpen(true);
          return;
        }

        if (type === "CASH") {
          setCashOpen(true);
          return;
        }
      } catch (error) {
        toast.error("Checkout failed");
      } finally {
        setLoading(false);
      }
    }
  return (
    <div className="grid grid-cols-12 gap-4 p-6 h-screen bg-gray-50">

      {/* PRODUCTS */}
      <div className="col-span-8 flex flex-col">

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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 overflow-auto">
          {filteredProducts.map((p) => (
            <Button
              key={p.id}
              onClick={() => cart.addItem(p)}
              disabled={p.stock <= 0}
              className="h-full flex flex-col items-start bg-white p-4 rounded-xl border hover:border-[#25D366]"
            >
              <p className="font-semibold">{p.name}</p>
              <p className="text-[#25D366]">M{p.price}</p>
              <p className="text-xs text-gray-500">Stock: {p.stock}</p>
            </Button>
          ))}
        </div>
      </div>

      {/* CART */}
      <div className="col-span-4 flex flex-col bg-white border rounded-xl">

        <div className="p-4 border-b">
          <h2 className="font-bold">Cart ({cartCount})</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {cart.items.map((item) => (
            <div key={item.id} className="border p-3 rounded-lg">
              <div className="flex justify-between">
                <p>{item.name}</p>
                <button onClick={() => cart.removeItem(item.id)}>✕</button>
              </div>

              <div className="flex justify-between mt-2">
                <div className="flex gap-2">
                  <button onClick={() => cart.decreaseQty(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => cart.increaseQty(item.id)}>+</button>
                </div>

                <p>M{item.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t space-y-3">
          <p className="font-bold">Total: M{cart.total()}</p>

          <button
            onClick={() => checkout("CASH")}
            className="w-full bg-[#25D366] text-white p-3 rounded-lg"
          >
            CASH
          </button>

          <button
            onClick={() => checkout("CREDIT")}
            className="w-full bg-black text-white p-3 rounded-lg"
          >
            CREDIT
          </button>
        </div>
      </div>

      {/* CREDIT MODAL */}
      <CreditCheckoutModal
        open={creditOpen}
        onOpenChange={setCreditOpen}
        cartItems={cart.items}
        total={cart.total()}
        onSuccess={() => cart.clearCart()}
      />

      <Dialog open={cashOpen} onOpenChange={setCashOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl bg-white p-6">

          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Cash Payment
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4 space-y-3">

            <div className="p-3 rounded-lg bg-gray-50 border">
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-xl font-bold">M{cart.total()}</p>
            </div>

            <input
              value={cashReceived}
              onChange={(e) => setCashReceived(e.target.value)}
              placeholder="Money received (M)"
              type="number"
              className="w-full h-11 px-3 rounded-lg border focus:ring-2 focus:ring-[#25D366]/30 focus:border-[#25D366]"
            />

            {cashReceived && (
              <div className="p-3 rounded-lg border bg-white">
                <p className="text-sm text-gray-500">Change</p>
                <p
                  className={`text-xl font-bold ${
                    change >= 0 ? "text-[#25D366]" : "text-red-500"
                  }`}
                >
                  M{change.toFixed(2)}
                </p>
              </div>
            )}

            <button
              disabled={change < 0}
              onClick={async () => {
                try {
                  await checkoutSale(cart.items, "CASH");

                  cart.clearCart();
                  setCashOpen(false);
                  setCashReceived("");

                  toast.success("Sale completed successfully");
                } catch (err) {
                  toast.error("Failed to complete sale");
                }
              }}
              className="w-full bg-[#25D366] text-white p-3 rounded-lg font-semibold disabled:opacity-50"
            >
              Complete Sale
            </button>

          </div>

        </DialogContent>
      </Dialog>
    </div>
  );
}