"use client"

import Link from "next/link";
import { useState } from "react";
import { Search, User } from "lucide-react";
import AddCustomer from "@/components/customers/AddCustomer";

type Customer = {
  id: string;
  name: string;
  phone?: string | null;
  balance: number;
};

export default function CustomerClient({
  customers,
}: {
  customers: Customer[];
}) {
  const [search, setSearch] = useState("");

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-6 space-y-6">

      {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">

        <div>
            <h1 className="text-3xl font-bold text-[#111111]">
            Customers
            </h1>

            <p className="text-sm text-gray-500 mt-1">
            Manage customer accounts & credit history
            </p>
        </div>

        {/* ADD CUSTOMER BUTTON */}
        <div className="shrink-0">
            <AddCustomer />
        </div>

        </div>

      {/* SEARCH */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search customers..."
          className="w-full pl-10 h-11 rounded-xl border border-gray-200 bg-white
                     focus:outline-none focus:ring-2 focus:ring-[#25D366]/30
                     focus:border-[#25D366]"
        />
      </div>

      {/* GRID */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {filtered.map((c) => (
          <Link
            key={c.id}
            href={`/dashboard/customers/${c.id}`}
            className="group bg-white border border-gray-100 rounded-2xl p-5
                       shadow-sm hover:shadow-lg transition-all"
          >

            {/* TOP */}
            <div className="flex items-center gap-3">

              <div className="h-10 w-10 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                <User className="h-4 w-4 text-[#25D366]" />
              </div>

              <div>
                <p className="font-semibold text-[#111111] group-hover:text-[#25D366]">
                  {c.name}
                </p>

                <p className="text-xs text-gray-400">
                  ID: {c.id.slice(0, 6)}
                </p>
              </div>

            </div>

            {/* BALANCE */}
            <div className="mt-4 flex justify-between items-end">

              <div>
                <p className="text-xs text-gray-400">Balance</p>

                <p
                  className={`text-xl font-bold ${
                    c.balance > 0 ? "text-red-500" : "text-[#25D366]"
                  }`}
                >
                  M{c.balance.toFixed(2)}
                </p>
              </div>

              <span className="text-xs text-gray-400">
                {c.balance > 0 ? "Owing" : "Clear"}
              </span>

            </div>

          </Link>
        ))}

      </div>
    </div>
  );
}