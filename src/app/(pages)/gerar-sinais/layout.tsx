import { Footer } from "@/components/footer"
import { NavBar } from "@/components/nav-bar"

export const metadata = {
    title: 'Gerador De Sinais - FP',
    description: "Gerador de Sinais Slots - Grupo FP"
}

export default function GerarSinaisLayout({
    children,
}: { children: React.ReactNode }) {
    return (
        <>
            <NavBar />
            {children}
            <Footer />
        </>

    )
}