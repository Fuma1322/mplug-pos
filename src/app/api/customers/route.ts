import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, phone } = body;

    const customer = await prisma.customer.create({
      data: {
        name,
        phone,
        balance: 0,
      },
    });

    return NextResponse.json(customer);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create customer" },
      { status: 500 }
    );
  }
}