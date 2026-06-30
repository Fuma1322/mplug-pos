import type { Metadata } from "next";
import "./globals.css";
import { Inter, Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MPlug POS",
  description: "MPlug POS is a modern point-of-sale application designed for businesses to manage sales, inventory, and customer interactions efficiently. It provides a user-friendly interface and powerful features to streamline your business operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(inter.variable, poppins.variable)}>
      <body
        className="min-h-screen bg-white font-sans antialiased"
      >
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
