"use client";

import Link from "next/link";
import { LoaderFour } from "@/components/ui/loader";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f7f8fa] flex items-center justify-center p-6">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT: HERO CONTENT */}
        <div className="space-y-6">

          {/* BRAND */}
          <div className="space-y-2">
            <p className="text-[#25D366] font-semibold tracking-wide">
              MPlug POS
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-[#111111] leading-tight">
              Run your business <br />
              like a modern store.
            </h1>

            <p className="text-gray-600 text-base md:text-lg">
              Sales, inventory, customers, and cash-up — all in one clean system built for speed and simplicity.
            </p>
          </div>

          {/* CTA BUTTON */}
          <div className="flex gap-4">
            <Link
              href="/dashboard/sales"
              className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-semibold shadow-md hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Start Selling

              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* MINI STATS */}
          <div className="grid grid-cols-3 gap-3 pt-4">
            <div className="border border-[#111111]/10 rounded-xl p-3 bg-white">
              <p className="text-xs text-gray-500">Fast Sales</p>
              <p className="font-bold text-[#111111]">POS</p>
            </div>

            <div className="border border-[#111111]/10 rounded-xl p-3 bg-white">
              <p className="text-xs text-gray-500">Stock</p>
              <p className="font-bold text-[#111111]">Live</p>
            </div>

            <div className="border border-[#111111]/10 rounded-xl p-3 bg-white">
              <p className="text-xs text-gray-500">Cash Up</p>
              <p className="font-bold text-[#111111]">Auto</p>
            </div>
          </div>
        </div>

        {/* RIGHT: VISUAL PANEL */}
        <div className="bg-white border border-[#111111]/10 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center space-y-6">

          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold text-[#111111]">
              System Preview
            </h2>
            <p className="text-sm text-gray-500">
              Your POS is ready to operate
            </p>
          </div>

          {/* LOADER / DEMO UI */}
          <div className="scale-110 text-7xl font-bold text-[#25D366]">
            <LoaderFour />
          </div>

          {/* STATUS */}
          <div className="w-full border-t pt-4 flex justify-between text-sm">
            <span className="text-gray-500">System Status</span>
            <span className="text-[#25D366] font-semibold">Online</span>
          </div>
        </div>

      </div>
    </div>
  );
}