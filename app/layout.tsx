import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import { headers } from "next/headers";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import { getCategoriesSafe, getTickerProductsSafe } from "@/lib/api";
import { auth } from "@/lib/auth";
import type { Category } from "@/lib/types";

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

/** Session is request-time data — reading it inside Suspense keeps the shell static */
async function NavbarWithSession({ categories }: { categories: Category[] }) {
  const session = await auth.api.getSession({ headers: await headers() });
  return (
    <Navbar
      categories={categories}
      user={
        session
          ? {
              name: session.user.name,
              email: session.user.email,
              image: session.user.image ?? null,
            }
          : null
      }
    />
  );
}

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
    <html
      lang="bn"
      className={`${hindSiliguri.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Suspense fallback={<Navbar categories={categories} user={null} />}>
          <NavbarWithSession categories={categories} />
        </Suspense>
        <Ticker products={tickerProducts} />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
