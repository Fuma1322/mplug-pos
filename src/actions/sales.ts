"use server";

import { prisma } from "@/lib/db";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export async function checkoutSale(
  items: CartItem[],
  type: "CASH" | "CREDIT"
) {
  if (!items || items.length === 0) {
    throw new Error("Cart is empty");
  }

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const sale = await prisma.sale.create({
    data: {
      total,
      type,
      items: {
        create: items.map((item) => ({
          quantity: item.quantity,
          price: item.price,
          productId: item.id,
        })),
      },
    },
  });

  // 🔻 Reduce stock AFTER sale is created
  for (const item of items) {
    await prisma.product.update({
      where: { id: item.id },
      data: {
        stock: {
          decrement: item.quantity,
        },
      },
    });
  }

  return sale;
}