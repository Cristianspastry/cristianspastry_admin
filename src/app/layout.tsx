import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutProvider from "@/components/layout/layout";
import { AuthProvider } from "@/components/AuthContext/authContext";

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
      <AuthProvider>
      <LayoutProvider>
        <main className="flex-1">
        {children}
        </main>
      </LayoutProvider>
      </AuthProvider>
    </body>
    </html>
  );
}
/*<NavBar />
      <main className="flex-1">
        {children}
      </main>*/