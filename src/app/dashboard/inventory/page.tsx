import { prisma } from "@/lib/db";
import InventoryClient from "./ui/InventoryClient";

export default async function InventoryPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  const serializedProducts = products.map((product) => ({
    ...product,
    createdAt: product.createdAt.toISOString(),
  }));

  return <InventoryClient products={serializedProducts} />;
}