import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Wallet,
  MonitorSmartphone,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Sales",
      href: "/dashboard/sales",
      icon: ShoppingCart,
    },
    {
      name: "Inventory",
      href: "/dashboard/inventory",
      icon: Package,
    },
    {
      name: "Customers",
      href: "/dashboard/customers",
      icon: Users,
    },
    {
      name: "Cash Up",
      href: "/dashboard/cashup",
      icon: Wallet,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 border-r border-[#25D366]/20 bg-white shadow-sm">
        
        {/* Logo */}
        <div className="border-b border-[#25D366]/10 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#25D366]/10">
              <MonitorSmartphone className="h-6 w-6 text-[#25D366]" />
            </div>

            <div>
              <h2 className="font-bold text-[#111111] text-lg">
                MPlug POS
              </h2>

              <p className="text-xs text-gray-500">
                Retail Management System
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Main Menu
          </p>

          <div className="space-y-2">
            {links.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="
                    group
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-4
                    py-3
                    text-sm
                    font-medium
                    text-[#111111]
                    transition-all
                    duration-300
                    hover:bg-[#25D366]/10
                    hover:text-[#25D366]
                    hover:translate-x-1
                  "
                >
                  <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />

                  {link.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 w-72 border-t border-[#25D366]/10 p-4">
          <div className="rounded-xl bg-[#25D366]/10 p-3">
            <p className="font-semibold text-[#111111]">
              MPlug POS
            </p>

            <p className="text-xs text-gray-500 mt-1">
              Built for modern businesses in Lesotho 🇱🇸
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}