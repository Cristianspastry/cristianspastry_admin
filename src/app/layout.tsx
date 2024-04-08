import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { FiHome, FiLogOut, FiSettings } from "react-icons/fi";
import NavBar from "@/components/layout/navBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cristian's pastry admin",
  description: "Cristian's pastry admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     <body className="flex">
      <NavBar />
      <main className="flex-1">
        {children}
      </main>
    </body>
    </html>
  );
}
