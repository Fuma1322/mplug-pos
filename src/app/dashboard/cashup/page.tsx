import CashUpClient from "./ui/CashUpClient";
import { getTodaySummary } from "@/actions/cashup";

export default async function CashUpPage() {
  const summary = await getTodaySummary();

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      <h1 className="text-2xl font-bold text-[#111111]">
        Cash Up (Today)
      </h1>

      <div className="grid md:grid-cols-3 gap-4">

        <div className="p-4 border border-[#111111]/10 rounded-xl bg-white">
          <p className="text-gray-500 text-sm">Cash Sales</p>
          <p className="text-xl font-bold">M{summary.cashSales}</p>
        </div>

        <div className="p-4 border border-[#111111]/10 rounded-xl bg-white">
          <p className="text-gray-500 text-sm">Credit Sales</p>
          <p className="text-xl font-bold">M{summary.creditSales}</p>
        </div>

        <div className="p-4 border border-[#111111]/10 rounded-xl bg-white">
          <p className="text-gray-500 text-sm">Total</p>
          <p className="text-xl font-bold text-[#25D366]">
            M{summary.totalSales}
          </p>
        </div>

      </div>

      <CashUpClient summary={summary} />
    </div>
  );
}