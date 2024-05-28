import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";

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
      <body className={`bg-[url('https://sa-east-1.graphassets.com/clwqdkiy400yu07ls56ql92po/clwqg0s0p03gw07lznkhkldwt')] bg-fixed bg-cover bg-center text-zinc-50 ${roboto.variable}`}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
