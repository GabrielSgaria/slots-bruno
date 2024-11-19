import { Footer } from "@/components/footer"
import LoadingProvider from "@/components/loading-provider"
import { NavBar } from "@/components/nav-bar"

export const metadata = {
    title: 'Gerador De Sinais - FP',
    description: "Gerador de Sinais Slots - Grupo FP"
}

export default function GerarSinaisLayout({
    children,
}: { children: React.ReactNode }) {
    return (
        <> <LoadingProvider>

            <NavBar />
            {children}
            <Footer />
        </LoadingProvider>
        </>

    )
}