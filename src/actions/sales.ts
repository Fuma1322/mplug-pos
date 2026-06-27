"use server";

import { prisma } from "@/lib/db";

export async function checkoutSale(
  items: { id: string; name: string; price: number; quantity: number }[],
  type: "CASH" | "CREDIT"
) {
  return await prisma.$transaction(async (tx) => {
    if (!items.length) throw new Error("Cart is empty");

    let total = 0;

    // 1. Validate stock first
    for (const item of items) {
      const product = await tx.product.findUnique({
        where: { id: item.id },
      });

      if (!product) throw new Error("Product not found");

      if (product.stock < item.quantity) {
        throw new Error(`${product.name} out of stock`);
      }

      total += item.price * item.quantity;
    }

    // 2. Create sale
    const sale = await tx.sale.create({
      data: {
        total,
        type,
      },
    });

    // 3. Create items + reduce stock
    for (const item of items) {
      await tx.saleItem.create({
        data: {
          saleId: sale.id,
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        },
      });

      await tx.product.update({
        where: { id: item.id },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    return sale;
  });
}