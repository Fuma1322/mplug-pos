import { prisma } from "@/lib/db";

export async function getDashboardData() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  // =========================
  // SALES TODAY
  // =========================
  const salesToday = await prisma.sale.findMany({
    where: {
      createdAt: {
        gte: today,
        lt: tomorrow,
      },
    },
  });

  const totalSales = salesToday.reduce(
    (sum, s) => sum + s.total,
    0
  );

  const cashSales = salesToday
    .filter((s) => s.type === "CASH")
    .reduce((sum, s) => sum + s.total, 0);

  const creditSales = salesToday
    .filter((s) => s.type === "CREDIT")
    .reduce((sum, s) => sum + s.total, 0);

  // =========================
  // PRODUCTS
  // =========================
  const productCount = await prisma.product.count();

  const lowStockCount = await prisma.product.count({
    where: {
      stock: {
        lte: 5,
      },
    },
  });

  // =========================
  // CREDIT OWED (CORRECT MODEL)
  // =========================
  const creditDebt = await prisma.credit.findMany({
    where: {
      type: "DEBT",
    },
  });

  const creditPayments = await prisma.credit.findMany({
    where: {
      type: "PAYMENT",
    },
  });

  const totalDebt = creditDebt.reduce(
    (sum, c) => sum + c.amount,
    0
  );

  const totalPaid = creditPayments.reduce(
    (sum, c) => sum + c.amount,
    0
  );

  const creditOwed = totalDebt - totalPaid;

  // =========================
  // RECENT SALES
  // =========================
  const recentSales = await prisma.sale.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return {
    cashSales,
    creditSales,
    totalSales,
    productCount,
    lowStockCount,
    creditOwed,
    recentSales,
  };
}