import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AddProduct from "./ui/AddProduct";

export default async function InventoryPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Inventory</h1>
          <p className="text-sm text-muted-foreground">
            Manage shop products & stock
          </p>
        </div>

        <AddProduct />
      </div>

      <div className="grid gap-4">

        {products.map((product) => {
          const lowStock = product.stock <= product.minStock;

          return (
            <Card key={product.id}>
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle className="text-base">
                  {product.name}
                </CardTitle>

                {lowStock && (
                  <Badge variant="destructive">
                    Low Stock
                  </Badge>
                )}
              </CardHeader>

              <CardContent className="flex justify-between text-sm">
                <p>Price: M{product.price}</p>
                <p>Stock: {product.stock}</p>
              </CardContent>
            </Card>
          );
        })}

      </div>
    </div>
  );
}