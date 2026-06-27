"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

type Customer = {
  id: string;
  name: string;
  phone?: string | null;
  balance: number;
};

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cartItems: CartItem[];
  total: number;
  onSuccess?: () => void;
};

export default function CreditCheckoutModal({
  open,
  onOpenChange,
  cartItems,
  total,
  onSuccess,
}: Props) {
  const router = useRouter();

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);
  const [loading, setLoading] = useState(false);

  // Load customers when modal opens
  useEffect(() => {
    if (!open) return;

    fetch("/api/customers")
      .then((res) => res.json())
      .then(setCustomers)
      .catch(() => toast.error("Failed to load customers"));
  }, [open]);

  // Filter customers
  const filteredCustomers = useMemo(() => {
    return customers.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [customers, search]);

  const newBalance = useMemo(() => {
    if (!selectedCustomer) return 0;
    return selectedCustomer.balance + total;
  }, [selectedCustomer, total]);

  async function completeCreditSale() {
    if (!selectedCustomer) {
      toast.error("Please select a customer");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/sales/credit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: selectedCustomer.id,
          items: cartItems,
        }),
      });

      if (!res.ok) throw new Error();

      toast.success("Credit sale completed");

      setSelectedCustomer(null);
      setSearch("");
      onOpenChange(false);

      onSuccess?.();
      router.refresh();
    } catch (err) {
      toast.error("Failed to complete credit sale");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl rounded-2xl bg-white p-6">

        {/* HEADER */}
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#111111]">
            Credit Sale
          </DialogTitle>
        </DialogHeader>

        {/* SEARCH */}
        <div className="mt-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customer..."
            className="w-full h-11 px-3 rounded-lg border border-gray-200
                       focus:outline-none focus:ring-2 focus:ring-[#25D366]/30
                       focus:border-[#25D366]"
          />
        </div>

        {/* CUSTOMER LIST */}
        <div className="mt-4 max-h-60 overflow-y-auto space-y-2">
          {filteredCustomers.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCustomer(c)}
              className={`w-full text-left p-3 rounded-lg border transition
                ${
                  selectedCustomer?.id === c.id
                    ? "border-[#25D366] bg-[#25D366]/5"
                    : "border-gray-100 hover:border-gray-200"
                }`}
            >
              <p className="font-semibold text-[#111111]">
                {c.name}
              </p>

              <p className="text-xs text-gray-400">
                Balance: M{c.balance}
              </p>
            </button>
          ))}
        </div>

        {/* BALANCE PREVIEW */}
        {selectedCustomer && (
          <div className="mt-4 p-4 rounded-xl bg-gray-50 border">
            <p className="text-sm text-gray-500">
              Balance Preview
            </p>

            <div className="flex justify-between mt-2 text-sm">
              <span>Current</span>
              <span>M{selectedCustomer.balance}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>New Sale</span>
              <span>M{total}</span>
            </div>

            <div className="flex justify-between font-bold mt-2">
              <span>New Total</span>
              <span className="text-red-500">
                M{newBalance}
              </span>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <div className="mt-6 flex gap-2">
          <button
            className="w-full hover:bg-gray-300 p-3 rounded-lg font-semibold transition-all"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </button>

          <button
            onClick={completeCreditSale}
            disabled={loading}
            className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white p-3 rounded-lg font-semibold"
          >
            {loading ? "Processing..." : "Complete Credit Sale"}
          </button>
        </div>

      </DialogContent>
    </Dialog>
  );
}