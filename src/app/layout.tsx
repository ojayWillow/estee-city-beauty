import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Estee City Beauty - Skaistumkopšanas pakalpojumi",
  description: "Rezervē manikīru, pedikīru, skropstu pagarināšanu un citus skaistumkopšanas pakalpojumus pie Estee City Beauty",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="lv">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
