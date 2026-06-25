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

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[#25D366] font-semibold">
            MPlug POS
          </p>

          <h1 className="text-3xl font-bold text-[#111111]">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Monitor sales, inventory, and store performance.
          </p>
        </div>

        <div className="mt-4 md:mt-0">
          <div className="rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 px-4 py-2">
            <p className="text-sm text-[#25D366] font-medium">
              Business Status: Active
            </p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <Card className="border-[#25D366]/20 hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm">
              Today's Sales
            </CardTitle>

            <div className="h-10 w-10 rounded-xl bg-[#25D366]/10 flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 text-[#25D366]" />
            </div>
          </CardHeader>

          <CardContent>
            <h2 className="text-3xl font-bold text-[#111111]">
              M0.00
            </h2>

            <p className="text-xs text-gray-500 mt-1">
              Cash Payments
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm">
              Products
            </CardTitle>

            <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>

          <CardContent>
            <h2 className="text-3xl font-bold">120</h2>

            <p className="text-xs text-gray-500 mt-1">
              Inventory Items
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm">
              Low Stock
            </CardTitle>

            <div className="h-10 w-10 rounded-xl bg-orange-100 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
            </div>
          </CardHeader>

          <CardContent>
            <h2 className="text-3xl font-bold">4</h2>

            <p className="text-xs text-gray-500 mt-1">
              Products Need Restocking
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm">
              Credit Owed
            </CardTitle>

            <div className="h-10 w-10 rounded-xl bg-red-100 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-red-600" />
            </div>
          </CardHeader>

          <CardContent>
            <h2 className="text-3xl font-bold">M0.00</h2>

            <p className="text-xs text-gray-500 mt-1">
              Outstanding Customer Debt
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-[#111111] mb-4">
          Quick Actions
        </h2>

        <div className="grid gap-4 md:grid-cols-3">

          <Card className="cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all border-[#25D366]/20">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">
                    New Sale
                  </h3>

                  <p className="text-sm text-gray-500 mt-2">
                    Create and process a sale.
                  </p>
                </div>

                <ArrowUpRight className="text-[#25D366]" />
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">
                    Inventory
                  </h3>

                  <p className="text-sm text-gray-500 mt-2">
                    Add and manage stock.
                  </p>
                </div>

                <ArrowUpRight className="text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">
                    Cash Up
                  </h3>

                  <p className="text-sm text-gray-500 mt-2">
                    Close and reconcile sales.
                  </p>
                </div>

                <ArrowUpRight className="text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>
            Recent Activity
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">

            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <p className="font-medium">
                  Sale #001
                </p>

                <p className="text-sm text-gray-500">
                  Completed successfully
                </p>
              </div>

              <span className="text-[#25D366] font-semibold">
                M150.00
              </span>
            </div>

            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <p className="font-medium">
                  Stock Updated
                </p>

                <p className="text-sm text-gray-500">
                  Soft Drinks Inventory
                </p>
              </div>

              <span className="text-blue-600">
                +24 Units
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">
                  Credit Payment
                </p>

                <p className="text-sm text-gray-500">
                  Customer settled account
                </p>
              </div>

              <span className="text-[#25D366]">
                M300.00
              </span>
            </div>

          </div>
        </CardContent>
      </Card>

    </div>
  );
}