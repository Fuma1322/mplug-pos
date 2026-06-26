import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Package,
  ShoppingCart,
  AlertTriangle,
  CreditCard,
  ArrowUpRight,
} from "lucide-react";

import { getDashboardData } from "@/actions/dashboard";

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div>
        <p className="text-[#25D366] font-semibold">MPlug POS</p>

        <h1 className="text-3xl font-bold text-[#111111]">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Monitor sales, inventory, and store performance.
        </p>
      </div>

      {/* STATS */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        {/* SALES */}
        <Card className="border-[#25D366]/20 hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm">
              Today's Sales
            </CardTitle>
            <ShoppingCart className="h-5 w-5 text-[#25D366]" />
          </CardHeader>

          <CardContent>
            <h2 className="text-3xl font-bold text-[#111111]">
              M{data.totalSales}
            </h2>

            <p className="text-xs text-gray-500 mt-1">
              Cash: M{data.cashSales} | Credit: M{data.creditSales}
            </p>
          </CardContent>
        </Card>

        {/* PRODUCTS */}
        <Card className="hover:shadow-lg transition-all">
          <CardHeader className="flex justify-between">
            <CardTitle className="text-sm">
              Products
            </CardTitle>
            <Package className="h-5 w-5 text-blue-600" />
          </CardHeader>

          <CardContent>
            <h2 className="text-3xl font-bold">
              {data.productCount}
            </h2>

            <p className="text-xs text-gray-500">
              Total inventory items
            </p>
          </CardContent>
        </Card>

        {/* LOW STOCK */}
        <Card className="hover:shadow-lg transition-all">
          <CardHeader className="flex justify-between">
            <CardTitle className="text-sm">
              Low Stock
            </CardTitle>
            <AlertTriangle className="h-5 w-5 text-orange-600" />
          </CardHeader>

          <CardContent>
            <h2 className="text-3xl font-bold">
              {data.lowStockCount}
            </h2>

            <p className="text-xs text-gray-500">
              Needs restocking
            </p>
          </CardContent>
        </Card>

        {/* CREDIT OWED */}
        <Card className="hover:shadow-lg transition-all">
          <CardHeader className="flex justify-between">
            <CardTitle className="text-sm">
              Credit Owed
            </CardTitle>
            <CreditCard className="h-5 w-5 text-red-600" />
          </CardHeader>

          <CardContent>
            <h2 className="text-3xl font-bold">
              M{data.creditSales}
            </h2>

            <p className="text-xs text-gray-500">
              Outstanding customer debt
            </p>
          </CardContent>
        </Card>
      </div>

      {/* QUICK ACTIONS (unchanged) */}
      <div>
        <h2 className="text-xl font-semibold text-[#111111] mb-4">
          Quick Actions
        </h2>

        <div className="grid gap-4 md:grid-cols-3">

          <Card className="cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all border-[#25D366]/20">
            <CardContent className="p-6">
              <h3 className="font-semibold">New Sale</h3>
              <p className="text-sm text-gray-500 mt-2">
                Create and process a sale.
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all">
            <CardContent className="p-6">
              <h3 className="font-semibold">Inventory</h3>
              <p className="text-sm text-gray-500 mt-2">
                Add and manage stock.
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all">
            <CardContent className="p-6">
              <h3 className="font-semibold">Cash Up</h3>
              <p className="text-sm text-gray-500 mt-2">
                Close and reconcile sales.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            {data.recentSales.map((sale) => (
              <div
                key={sale.id}
                className="flex justify-between border-b pb-2"
              >
                <div>
                  <p className="font-medium">
                    Sale #{sale.id.slice(0, 6)}
                  </p>

                  <p className="text-sm text-gray-500">
                    {sale.type}
                  </p>
                </div>

                <span className="text-[#25D366] font-semibold">
                  M{sale.total}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  );
}