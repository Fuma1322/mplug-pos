import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const { id } = await req.json();

  await prisma.product.delete({
    where: { id },
  });

  return Response.json({ success: true });
}