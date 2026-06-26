"use server";

import { prisma } from "@/lib/db";

/**
 * Create credit when customer buys on credit
 */
export async function createCreditDebt(
  customerId: string,
  amount: number,
  saleId?: string
) {
  const credit = await prisma.credit.create({
    data: {
      customerId,
      amount,
      type: "DEBT",
      saleId,
    },
  });

  await prisma.customer.update({
    where: { id: customerId },
    data: {
      balance: {
        increment: amount,
      },
    },
  });

  return credit;
}

/**
 * Record payment from customer
 */
export async function payCredit(
  customerId: string,
  amount: number
) {
  await prisma.credit.create({
    data: {
      customerId,
      amount,
      type: "PAYMENT",
    },
  });

  await prisma.customer.update({
    where: { id: customerId },
    data: {
      balance: {
        decrement: amount,
      },
    },
  });
}

/**
 * Get all customers
 */
export async function getCustomers() {
  return prisma.customer.findMany({
    orderBy: { createdAt: "desc" },
  });
}

/**
 * Get single customer
 */
export async function getCustomer(id: string) {
  return prisma.customer.findUnique({
    where: { id },
    include: {
      credits: {
        orderBy: { createdAt: "desc" },
      },
    },
  });
}