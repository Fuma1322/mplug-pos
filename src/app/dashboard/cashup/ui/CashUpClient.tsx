"use client";

import { useState } from "react";
import { closeCashUp } from "@/actions/cashup";

export default function CashUpClient({
  summary,
}: {
  summary: {
    cashSales: number;
    creditSales: number;
    totalSales: number;
  };
}) {
  const [actualCash, setActualCash] = useState("");

  const expected = summary.cashSales;
  const difference = Number(actualCash || 0) - expected;

  async function submit() {
    await closeCashUp(Number(actualCash));
    alert("Cash-up completed");
    setActualCash("");
  }

  return (
    <div className="rounded-xl border border-[#111111]/10 bg-white shadow-sm p-5 space-y-4">
      <h2 className="font-semibold text-[#111111]">
        Close Cash-Up
      </h2>

      {/* EXPECTED */}
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Expected Cash</span>
        <span className="font-medium text-[#111111]">
          M{expected}
        </span>
      </div>

      {/* INPUT */}
      <input
        className="w-full rounded-lg border border-[#111111]/20 p-3 outline-none focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20 transition"
        placeholder="Enter actual cash in drawer"
        value={actualCash}
        onChange={(e) => setActualCash(e.target.value)}
      />

      {/* DIFFERENCE */}
      <div
        className={`flex justify-between text-sm font-semibold ${
          difference < 0 ? "text-red-500" : "text-[#25D366]"
        }`}
      >
        <span>Difference</span>
        <span>M{difference || 0}</span>
      </div>

      {/* BUTTON */}
      <button
        onClick={submit}
        className="w-full rounded-lg bg-[#25D366] hover:bg-[#1fb85a] text-white font-semibold p-3 transition"
      >
        Close Day
      </button>
    </div>
  );
}