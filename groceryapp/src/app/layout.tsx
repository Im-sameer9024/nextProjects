import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import ToolProvider from "@/provider/ToolProvider";
import Navbar from "@/components/common/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreshCart - Online Grocery Delivery & Marketplace",
  description:
    "Shop fresh groceries, fruits, vegetables, dairy, and household essentials online. Fast delivery, best prices, and wide selection at FreshCart.",
  keywords: [
    "online grocery",
    "grocery delivery",
    "fresh vegetables",
    "dairy products",
    "supermarket online",
    "grocery shopping",
    "food delivery",
    "ecommerce grocery",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/logo.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${outfit.variable} ${geistMono.variable} antialiased`}
      >
        <ToolProvider>
          <Navbar />
          {children}
        </ToolProvider>
      </body>
    </html>
  );
}
