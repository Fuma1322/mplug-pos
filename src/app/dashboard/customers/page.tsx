import { prisma } from "@/lib/db";
import CustomerClient from "./ui/CustomerClient";

export default async function CustomersPage() {
  const customers = await prisma.customer.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <CustomerClient customers={customers} />;
}