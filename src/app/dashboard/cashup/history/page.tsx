import { getCashUpHistory } from "@/actions/cashup";

export default async function CashUpHistoryPage() {
  const sessions = await getCashUpHistory();

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-[#111111]">
          Cash-Up History
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Daily till reconciliation records
        </p>
      </div>

      <div className="grid gap-4">

        {sessions.length === 0 && (
          <div className="p-6 text-gray-400 text-sm border rounded-xl bg-white">
            No cash-up sessions yet
          </div>
        )}

        {sessions.map((s) => {
          const date = new Date(s.createdAt).toDateString();

          return (
            <div
              key={s.id}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
            >

              {/* HEADER */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-[#111111]">
                    {date}
                  </p>

                  <p className="text-xs text-gray-400">
                    Session ID: {s.id.slice(0, 8)}
                  </p>
                </div>

                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    s.difference === 0
                      ? "bg-green-100 text-green-700"
                      : s.difference > 0
                      ? "bg-blue-100 text-blue-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {s.difference === 0
                    ? "BALANCED"
                    : s.difference > 0
                    ? "OVER"
                    : "SHORT"}
                </span>
              </div>

              {/* GRID */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4 text-sm">

                <div>
                  <p className="text-gray-400">Cash Sales</p>
                  <p className="font-semibold">M{s.cashSales}</p>
                </div>

                <div>
                  <p className="text-gray-400">Credit Sales</p>
                  <p className="font-semibold">M{s.creditSales}</p>
                </div>

                <div>
                  <p className="text-gray-400">Expected Cash</p>
                  <p className="font-semibold">M{s.expectedCash}</p>
                </div>

                <div>
                  <p className="text-gray-400">Actual Cash</p>
                  <p className="font-semibold">M{s.actualCash}</p>
                </div>

                <div>
                  <p className="text-gray-400">Difference</p>
                  <p
                    className={`font-bold ${
                      s.difference < 0
                        ? "text-red-500"
                        : "text-[#25D366]"
                    }`}
                  >
                    M{s.difference}
                  </p>
                </div>

              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}