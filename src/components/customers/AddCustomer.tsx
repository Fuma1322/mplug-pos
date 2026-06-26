"use client"

import { useState } from "react";
import { Button } from "../ui/button";

export default function AddCustomer() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  async function createCustomer() {
    if (!name || !phone) return;

    try {
      setLoading(true);

      await fetch("/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone }),
      });

      setName("");
      setPhone("");
      window.location.reload();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto mb-6">
      {/* CARD */}
      <div className="rounded-2xl border border-[#111111]/10 bg-white shadow-sm p-4 md:p-5">
        
        {/* HEADER */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-[#111111]">
            Add New Customer
          </h2>
          <p className="text-sm text-gray-500">
            Register a customer into MaseruPlug POS
          </p>
        </div>

        {/* INPUT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          
          {/* NAME */}
          <input
            className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20 transition"
            placeholder="Customer name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* PHONE */}
          <input
            className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20 transition"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {/* BUTTON */}
          <Button
            onClick={createCustomer}
            disabled={loading}
            className="h-11 w-full rounded-lg bg-[#25D366] text-white font-medium hover:bg-[#1ebe5d] transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Adding..." : "Add Customer"}
          </Button>
        </div>
      </div>
    </div>
  );
}