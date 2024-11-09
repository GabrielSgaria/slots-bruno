import type { Metadata, Viewport } from "next"
import { Roboto, Poppins } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google"
import { ButtonScrollTop } from "@/components/button-scroll-top"

import { ServiceWorkerInitializer } from "@/components/service-worker-initializer"
// import { LocalNotificationHandler } from "@/components/notification-local"
import { DownloadAppButton } from "@/components/download-app-button"

const poppins = Poppins(
  {
    subsets: ["latin"],
    weight: ['100', '300', '400', '500', '700', '900'],
    variable: "--poppins"
  })

const roboto = Roboto(
  {
    subsets: ["latin"],
    weight: ['100', '300', '400', '500', '700', '900'],
    variable: '--roboto'
  })

export const metadata: Metadata = {
  title: "FP - SINAIS SLOTS",
  description: "Grupo FP Site de Sinais Slots",
  metadataBase: new URL("https://www.grupofpsinais.com.br"),
  icons: [
    { rel: 'icon', url: '/favicon.png' },
    { rel: 'apple-touch-icon', url: '/icon-192x192.png' },
  ],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'FP - SINAIS SLOTS',
  },
  openGraph: {
    title: "Grupo FP Site de Sinais Slots",
    description: "Grupo FP Site de Sinais Slots",
    url: "https://www.grupofpsinais.com.br",
    siteName: "FP - SINAIS SLOTS",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: '/icon-512x512.png',
        width: 512,
        height: 512,
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
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <head>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />
        <meta name="application-name" content="FP - SINAIS SLOTS" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="FP Sinais" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`text-zinc-50 ${poppins.variable} ${roboto.variable}`}>
        <ButtonScrollTop />
        <div className="bg-zinc-950/20 backdrop-blur-sm">
          <GoogleAnalytics gaId="G-9E7Z61LW2J" />
          <GoogleTagManager gtmId="G-9E7Z61LW2J" />
          {children}
        </div>
        {/* <LocalNotificationHandler /> */}
        <Toaster />
        <ServiceWorkerInitializer />
        <DownloadAppButton />
      </body>
    </html>
  )
}