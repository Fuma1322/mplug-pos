import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();

  const product = await prisma.product.create({
    data: {
      name: body.name,
      price: body.price,
      stock: body.stock,
    },
  });

  return Response.json(product);
}