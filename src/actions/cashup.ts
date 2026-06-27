"use server";

import { prisma } from "@/lib/db";

/**
 * Get today's sales breakdown
 */
export async function getTodaySummary() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sales = await prisma.sale.findMany({
    where: {
      createdAt: {
        gte: today,
      },
    },
  });

  const cashSales = sales
    .filter((s) => s.type === "CASH")
    .reduce((sum, s) => sum + s.total, 0);

  const creditSales = sales
    .filter((s) => s.type === "CREDIT")
    .reduce((sum, s) => sum + s.total, 0);

  return {
    cashSales,
    creditSales,
    totalSales: cashSales + creditSales,
  };
}

/**
 * Close the cash-up for the day
 */
export async function closeCashUp(actualCash: number) {
  const summary = await getTodaySummary();

  const existing = await prisma.cashSession.findFirst({
    where: {
      date: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
      },
    },
  });

  if (existing) {
    throw new Error("Cash-up already completed for today");
  }

  const expectedCash = summary.cashSales;

  const difference = actualCash - expectedCash;

  const session = await prisma.cashSession.create({
    data: {
      cashSales: summary.cashSales,
      creditSales: summary.creditSales,
      totalSales: summary.totalSales,
      expectedCash,
      actualCash,
      difference,
    },
  });

  return session;
}

export async function getCashUpHistory() {
  const sessions = await prisma.cashSession.findMany({
    orderBy: { createdAt: "desc" },
  });

  return sessions;
}