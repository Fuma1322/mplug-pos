"use client";

import { useState } from "react";
import { payCredit } from "@/actions/credit";
import { toast } from "sonner";

export default function PayDebt({
  customerId,
}: {
  customerId: string;
}) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  async function pay() {
    if (!amount || Number(amount) <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    try {
      setLoading(true);

      await payCredit(customerId, Number(amount));

      toast.success("Payment recorded");

      setAmount("");

      window.location.reload();
    } catch (err) {
      toast.error("Payment failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">

      {/* INPUT */}
      <input
        className="h-11 w-full sm:w-64 rounded-xl border border-gray-200 px-3
                   focus:outline-none focus:ring-2 focus:ring-[#25D366]/30
                   focus:border-[#25D366] transition"
        placeholder="Enter payment amount (M)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        type="number"
        min={0}
      />

      {/* BUTTON */}
      <button
        onClick={pay}
        disabled={loading}
        className="h-11 px-6 rounded-xl bg-[#25D366] text-white font-semibold
                   hover:bg-[#1faa55] transition disabled:opacity-50
                   disabled:cursor-not-allowed"
      >
        {loading ? "Processing..." : "Record Payment"}
      </button>

    </div>
  );
}