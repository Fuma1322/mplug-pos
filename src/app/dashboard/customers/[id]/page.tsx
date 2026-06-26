import { getCustomer } from "@/actions/credit";
import PayDebt from "@/components/customers/PayDebt";

export default async function CustomerPage({
  params,
}: {
  params: { id: string };
}) {
  const customer = await getCustomer(params.id);

  if (!customer) return <div>Not found</div>;

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold">
        {customer.name}
      </h1>

      <p className="text-red-500 mb-4">
        Total Debt: M{customer.balance}
      </p>

      <PayDebt customerId={customer.id} />

      <h2 className="mt-6 font-bold">
        History
      </h2>

      <div className="space-y-2 mt-2">
        {customer.credits.map((c) => (
          <div
            key={c.id}
            className="border p-2 flex justify-between"
          >
            <p>{c.type}</p>
            <p>M{c.amount}</p>
          </div>
        ))}
      </div>

    </div>
  );
}