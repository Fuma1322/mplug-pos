"use client";

import { useState } from "react";
import { payCredit } from "@/actions/credit";

export default function PayDebt({
  customerId,
}: {
  customerId: string;
}) {
  const [amount, setAmount] = useState("");

  async function pay() {
    await payCredit(customerId, Number(amount));
    setAmount("");
    window.location.reload();
  }

  return (
    <div className="flex gap-2">

      <input
        className="border p-2"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button
        onClick={pay}
        className="bg-green-600 text-white px-4"
      >
        Pay
      </button>

    </div>
  );
}