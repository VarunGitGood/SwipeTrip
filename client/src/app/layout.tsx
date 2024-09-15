"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import useAuthRedirect from "@/hooks/useAuthRedirect";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useAuthRedirect();
  return (
    <html lang="en">
      <Toaster />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
