import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { customerId, items } = body;

    if (!customerId || !items?.length) {
      return NextResponse.json(
        { error: "Missing data" },
        { status: 400 }
      );
    }

    // 1. Calculate total
    const total = items.reduce(
    (sum: number, item: any) =>
      sum + Number(item.price) * Number(item.quantity),
    0
  );

    // 2. Get customer
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    // 3. TRANSACTION (CRITICAL FOR POS SYSTEMS)
    const result = await prisma.$transaction(async (tx) => {
      // CREATE SALE
      const sale = await tx.sale.create({
        data: {
          total,
          type: "CREDIT",
        },
      });

      // CREATE SALE ITEMS + REDUCE STOCK
      for (const item of items) {
        const product = await tx.product.findUnique({
          where: { id: item.id },
        });

        if (!product) {
          throw new Error("Product not found");
        }

        if (product.stock < item.quantity) {
          throw new Error(
            `Insufficient stock for ${product.name}`
          );
        }

        // create sale item
        await tx.saleItem.create({
          data: {
            saleId: sale.id,
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          },
        });

        // reduce stock
        await tx.product.update({
          where: { id: item.id },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      // UPDATE CUSTOMER BALANCE
      const updatedCustomer = await tx.customer.update({
        where: { id: customerId },
        data: {
          balance: {
            increment: total,
          },
        },
      });

      // CREATE CREDIT RECORD
      await tx.credit.create({
        data: {
          customerId,
          amount: total,
          type: "DEBT",
          note: `Credit sale - ${sale.id}`,
          saleId: sale.id,
        },
      });

      return { sale, updatedCustomer };
    });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error("CREDIT SALE ERROR:", error);

    return NextResponse.json(
      {
        error:
          error.message || "Failed to process credit sale",
      },
      { status: 500 }
    );
  }
}