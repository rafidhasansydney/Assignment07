import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import { getCategoriesSafe, getTickerProductsSafe } from "@/lib/api";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "বাজার দর — আজকের বাজারের দাম এক নজরে",
    template: "%s | বাজার দর",
  },
  description:
    "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের দাম এক নজরে — বাজারভিত্তিক সর্বনিম্ন, সর্বাধিক ও গড় দাম দেখুন।",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, tickerProducts] = await Promise.all([
    getCategoriesSafe(),
    getTickerProductsSafe(),
  ]);

  return (
    <html lang="bn" className={`${hindSiliguri.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Navbar categories={categories} />
        <Ticker products={tickerProducts} />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
