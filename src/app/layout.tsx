import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { Analytics } from "@vercel/analytics/next";




const roboto = Roboto(
  {
    subsets: ["latin"],
    weight: ['100', '300', '400', '500', '700', '900'],
    variable: '--roboto'
  });

export const metadata: Metadata = {
  title: "FP - SINAIS SLOTS",
  description: "Grupo FP Site de Sinais Slots",
  metadataBase: new URL("https://www.grupofpsinais.com.br"),
  icons: '/favicon.png',
  openGraph: {
    title: "Grupo FP Site de Sinais Slots",
    description: "Grupo FP Site de Sinais Slots",
    url: "https://www.grupofpsinais.com.br",
    siteName: "FP - SINAIS SLOTS",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: '../../public/favicon.png',
        width: 500,
        height: 500,
      }
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
    },
  },
  keywords: [
    "slots online", "roleta de cassino", "apostas de slots", "ganhos de slots", "rodadas grátis", "bônus de cassino", "cassino online",
    "estratégia de slots", "pagamentos de slots", "slots", "jogos de cassino", "símbolos scatter", "símbolos wild", "jogos de bônus", "slots 3D",
    "torneios de slots", "cassino móvel", "experiência de jogador", "slots com jackpot", "apostas altas", "jogos de alta volatilidade", 
    "taxa de retorno ao jogador (RTP)", "cassinos com slots", "slots com múltiplas linhas", "slots progressivos", "giros automáticos",
    "slots com multiplicadores", "tabela de pagamentos", "slots com rodadas bônus", "apostas", "tigrinho", "fortune tiger", "fortune", "tiger", "fortune rabbit", "fortune mouse",
    "fortune dragon", "fortune ox",
  ]
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`bg-image bg-fixed bg-contain md:bg-cover bg-center-top text-zinc-50 ${roboto.variable}`}>
      <Analytics />
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
