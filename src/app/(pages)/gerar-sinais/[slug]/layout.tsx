export const metadata = {
    title: 'Hack Slots - FP',
    description: "Gerador de Sinais Slots - Grupo FP"
}

export const runtime = 'edge';

export default function GeradorSlugLayout({
    children
}:{children: React.ReactNode}) {
    return (
        <>
            {children}
        </>
    )
}