import { prisma } from "@/lib/db";
import AddCustomer from "@/components/customers/AddCustomer";
import Link from "next/link";

export default async function CustomersPage() {
  const customers = await prisma.customer.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Customers
      </h1>

      <AddCustomer />

      <div className="grid gap-3">
        {customers.map((c) => (
          <Link
            key={c.id}
            href={`/dashboard/customers/${c.id}`}
            className="border p-3 rounded flex justify-between"
          >
            <p>{c.name}</p>
            <p className="text-red-500">
              Debt: M{c.balance}
            </p>
          </Link>
        ))}
      </div>

    </div>
  );
}