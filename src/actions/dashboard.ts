import { prisma } from "@/lib/db";

export async function getDashboardData() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sales = await prisma.sale.findMany({
    where: {
      createdAt: { gte: today },
    },
  });

  const cashSales = sales
    .filter((s) => s.type === "CASH")
    .reduce((sum, s) => sum + s.total, 0);

  const creditSales = sales
    .filter((s) => s.type === "CREDIT")
    .reduce((sum, s) => sum + s.total, 0);

  const productCount = await prisma.product.count();

  const lowStockCount = await prisma.product.count({
    where: {
      stock: { lte: 5 },
    },
  });

  const creditOwedAgg = await prisma.customer.aggregate({
    _sum: { balance: true },
  });

  const creditOwed = creditOwedAgg._sum.balance ?? 0;

  const recentSales = await prisma.sale.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return {
    cashSales,
    creditSales,
    totalSales: cashSales + creditSales,
    productCount,
    lowStockCount,
    creditOwed,
    recentSales,
  };
}