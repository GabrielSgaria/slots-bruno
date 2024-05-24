import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/nav-bar";

const roboto = Roboto(
  { 
    subsets: ["latin"], 
    weight: ['100', '300', '400', '500', '700', '900'],
    variable: '--roboto'
  });

export const metadata: Metadata = {
  title: "FP - SINAIS SLOTS",
  description: "Sinais FP SLOTS",
  icons: '/favicon.png'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`bg-zinc-950 text-zinc-50 ${roboto.variable}`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
