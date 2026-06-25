import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const { cart, type } = await req.json();

  let total = 0;

  for (const item of cart) {
    total += item.product.price * item.quantity;
  }

  const sale = await prisma.sale.create({
    data: {
      total,
      type,
      items: {
        create: cart.map((item: any) => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
        })),
      },
    },
  });

  // STOCK DEDUCTION (CRITICAL)
  for (const item of cart) {
    await prisma.product.update({
      where: { id: item.product.id },
      data: {
        stock: {
          decrement: item.quantity,
        },
      },
    });
  }

  return Response.json(sale);
}