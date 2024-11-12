import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Download App - Gerador De Sinais FP',
    description: 'Page Download App Gerador de Sinais Slots - Grupo FP',
}

export const viewport = {
    width: "device-width",
    initialScale: 1,
}

export const themeColor = "#000000"

export default function GerarSinaisLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className={`${inter.className} min-h-screen bg-gray-200 text-black`}>
            <div className="max-w-4xl mx-auto px-4 py-8 ">
                <main>{children}</main>
            </div>
        </div>
    )
}
