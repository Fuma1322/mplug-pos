import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AddProduct from "./ui/AddProduct";

export default async function InventoryPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-2xl font-bold text-[#111111]">
            Inventory
          </h1>

          <p className="text-sm text-gray-500">
            Manage stock across MPlug POS
          </p>
        </div>

        <AddProduct />
      </div>

      {/* GRID */}
      <div className="grid gap-4">

        {products.map((product) => {
          const lowStock = product.stock <= product.minStock;

          return (
            <Card
              key={product.id}
              className="group border border-[#111111]/10 bg-white rounded-xl shadow-sm hover:shadow-lg hover:border-[#25D366]/30 transition-all"
            >
              <CardHeader className="flex flex-col gap-2">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-base font-semibold text-[#111111] leading-snug group-hover:text-[#25D366] transition-colors break-words">
                    {product.name}
                  </CardTitle>

                  {lowStock ? (
                    <Badge className="bg-red-100 text-red-600 border border-red-200 whitespace-nowrap">
                      Low Stock
                    </Badge>
                  ) : (
                    <Badge className="bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 whitespace-nowrap">
                      In Stock
                    </Badge>
                  )}
                </div>
              </CardHeader>

              {/* BODY */}
              <CardContent className="space-y-4 pt-0">

                {/* TOP METRICS ROW */}
                <div className="flex items-center justify-between">

                  {/* PRICE */}
                  <div className="space-y-1">
                    <p className="text-[11px] text-gray-400 uppercase tracking-wide">
                      Price
                    </p>

                    <p className="text-lg font-bold text-[#25D366]">
                      M{product.price}
                    </p>
                  </div>

                  {/* STOCK */}
                  <div className="text-right space-y-1">
                    <p className="text-[11px] text-gray-400 uppercase tracking-wide">
                      Stock
                    </p>

                    <p className="text-lg font-bold text-[#111111]">
                      {product.stock}
                    </p>
                  </div>
                </div>

                {/* SMART INDICATOR BAR */}
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      lowStock ? "bg-red-500 w-1/4" : "bg-[#25D366] w-3/4"
                    }`}
                  />
                </div>

                {/* STATUS TEXT */}
                <div className="flex items-center justify-between">

                  {lowStock ? (
                    <p className="text-xs text-red-500 font-medium">
                      ⚠ Restock recommended
                    </p>
                  ) : (
                    <p className="text-xs text-[#25D366] font-medium">
                      ✓ Stock healthy
                    </p>
                  )}

                  <p className="text-xs text-gray-400">
                    Min: {product.minStock}
                  </p>
                </div>

              </CardContent>
            </Card>
          );
        })}

      </div>
    </div>
  );
}