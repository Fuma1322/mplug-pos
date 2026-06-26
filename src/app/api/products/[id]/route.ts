import { prisma } from "@/lib/db";

export async function PATCH(req: Request, { params }: any) {
  const body = await req.json();

  return Response.json(
    await prisma.product.update({
      where: { id: params.id },
      data: {
        name: body.name,
        price: Number(body.price),
        stock: Number(body.stock),
        minStock: Number(body.minStock),
      },
    })
  );
}

export async function DELETE(_: Request, { params }: any) {
  await prisma.product.delete({
    where: { id: params.id },
  });

  return Response.json({ success: true });
}