'use client'
import { useEffect, useRef, useState } from "react";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { CardGames } from "./card-games";

export interface CardData {
    id: number;
    nomeJogo: string;
    porcentagem: number;
    minima: number;
    padrao: number;
    maxima: number;
    updatedAt: Date;
}

interface SectionCardsProps {
    cards: CardData[] | null | undefined;
    linkCasa: string | null | undefined;
}

export function SectionCards({ cards, linkCasa }: SectionCardsProps) {
    const [cardsPerPage, setCardsPerPage] = useState<number>(14);
    const [loading, setLoading] = useState<boolean>(false);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!loadMoreRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading) {
                    setLoading(true);
                    setTimeout(() => {
                        setCardsPerPage((prev) => prev + 14);
                        setLoading(false);
                    }, 1000); // Simulate loading time
                }
            },
            { threshold: 1 }
        );

        observer.observe(loadMoreRef.current);

        return () => observer.disconnect();
    }, [loading]);

    return (
        <section>
            <div className="container mx-auto items-center justify-center px-3 sm:px-0 flex flex-col">
                {linkCasa ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-2">
                        {cards?.slice(0, cardsPerPage).map(({ id, porcentagem, minima, padrao, maxima }) => (
                            <CardGames key={id} id={id} porcentagem={porcentagem} linkCasa={linkCasa} minima={minima} padrao={padrao} maxima={maxima} />
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center flex-col">
                        <p className="text-zinc-50 text-xl uppercase font-bold flex">
                            Link não encontrado <DotFilledIcon className="size-8 text-red-600 animate-ping text-center" />
                        </p>
                        <p className="text-zinc-500">atualize na página do administrador</p>
                    </div>
                )}
                <div ref={loadMoreRef} className="h-10 flex items-center justify-center mt-4">
                    {loading && <p className="text-zinc-50 ">Carregando...</p>}
                </div>
            </div>
        </section>
    );
}
