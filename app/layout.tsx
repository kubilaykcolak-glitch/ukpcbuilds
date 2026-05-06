import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "UK PC Builds — Curated PC Builds for Every Budget",
    template: "%s | UK PC Builds",
  },
  description:
    "Find the best UK PC builds for gaming, office, content creation and high performance — with real prices from UK retailers like Amazon UK, Scan, and Overclockers.",
  keywords: ["PC build", "UK", "gaming PC", "budget PC", "best PC build 2025"],
  metadataBase: new URL("https://ukpcbuilds.co.uk"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={inter.variable}>
      <body className="bg-[#0F172A] text-white antialiased font-sans min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
