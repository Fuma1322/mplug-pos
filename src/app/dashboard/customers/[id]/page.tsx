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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-6 space-y-6">

      {/* HEADER */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-[#111111]">
          {customer.name}
        </h1>

        <p className="text-sm text-gray-500">
          Customer profile & credit ledger
        </p>
      </div>

      {/* DEBT CARD (HIGHLIGHTED) */}
      <div className="relative overflow-hidden rounded-2xl bg-white border border-red-100 shadow-sm p-6">

        {/* subtle glow accent */}
        <div className="absolute inset-x-0 top-0 h-1 bg-red-500" />

        <p className="text-xs text-gray-400 uppercase tracking-wide">
          Total Outstanding Debt
        </p>

        <p className="text-4xl font-bold text-red-500 mt-2">
          M{customer.balance}
        </p>

        <p className="text-xs text-gray-400 mt-1">
          Amount currently owed by customer
        </p>
      </div>

      {/* PAY DEBT (PROMINENT ACTION AREA) */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
        <h2 className="font-semibold text-[#111111] mb-3">
          Record Payment
        </h2>

        <PayDebt customerId={customer.id} />
      </div>

      {/* HISTORY */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">

        {/* HEADER */}
        <div className="p-5 border-b border-gray-100">
          <h2 className="font-semibold text-[#111111]">
            Credit Ledger
          </h2>

          <p className="text-xs text-gray-400 mt-1">
            Full transaction history (debt & payments)
          </p>
        </div>

        {/* LIST */}
        <div className="divide-y divide-gray-100">

          {customer.credits.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition"
            >

              {/* LEFT */}
              <div>
                <p className="text-sm font-medium text-[#111111]">
                  {c.type === "PAYMENT" ? "Payment Received" : "Debt Added"}
                </p>

                {c.note && (
                  <p className="text-xs text-gray-400 mt-0.5">
                    {c.note}
                  </p>
                )}
              </div>

              {/* RIGHT */}
              <p
                className={`font-semibold text-sm ${
                  c.type === "PAYMENT"
                    ? "text-[#25D366]"
                    : "text-red-500"
                }`}
              >
                {c.type === "PAYMENT" ? "-" : "+"}M{c.amount}
              </p>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}