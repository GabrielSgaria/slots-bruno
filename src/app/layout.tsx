import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/nav-bar";
import { Rubik_Glitch } from "next/font/google";

const roboto = Roboto(
  { 
    subsets: ["latin"], 
    weight: ['100', '300', '400', '500', '700', '900'],
    variable: '--roboto'
  });
export const rubik = Rubik_Glitch(
  {
    subsets: ["latin"],
    weight: ['400'],
    variable: '--rubik'
  });

export const metadata: Metadata = {
  title: "FP - SINAIS SLOTS",
  description: "Sinais FP SLOTS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`bg-zinc-950 text-zinc-50 ${roboto.variable} ${rubik.variable}`}>
        <NavBar />
        {children}</body>
    </html>
  );
}
