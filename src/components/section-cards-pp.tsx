'use client'
import { useEffect, useRef, useState } from "react";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { CardGames } from "./card-games";
import { SearchFilter } from "./filter-cards";

export interface CardData {
    id: number;
    nomeJogo: string;
    categoriaJogo: string;
    porcentagem: number;
    minima: number;
    padrao: number;
    maxima: number;
    updatedAt: Date;
}

interface SectionCardsPpProps {
    cards: CardData[] | null | undefined;
    linkCasa: string | null | undefined;
}

export function SectionCardsPP({ cards, linkCasa }: SectionCardsPpProps) {
    const [cardsPerPage, setCardsPerPage] = useState<number>(14);
    const [loading, setLoading] = useState<boolean>(false);
    const [filteredCards, setFilteredCards] = useState<CardData[]>(cards || []);
    const [visibleCards, setVisibleCards] = useState<CardData[]>([]);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setFilteredCards(cards || []);
    }, [cards]);

    useEffect(() => {
        setVisibleCards(filteredCards.slice(0, cardsPerPage));
    }, [filteredCards, cardsPerPage]);

    useEffect(() => {
        if (!loadMoreRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading && visibleCards.length < filteredCards.length) {
                    setLoading(true);
                    setTimeout(() => {
                        setCardsPerPage((prev) => prev + 8);
                        setLoading(false);
                    }, 500);
                }
            },
            { threshold: 1 }
        );

        observer.observe(loadMoreRef.current);

        return () => observer.disconnect();
    }, [loading, visibleCards.length, filteredCards.length]);

    return (
        <section className="flex flex-col mx-auto container items-center justify-center">
            <SearchFilter cardsProps={{ data: cards }} setFilteredCards={setFilteredCards} />
            <div className="container mx-auto items-center justify-center px-3 sm:px-0 flex flex-col">
                {linkCasa ?  (
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 '>
                        {visibleCards.map(({ id, nomeJogo, porcentagem, minima, padrao, maxima, categoriaJogo }) => (
                            <CardGames
                                key={id}
                                id={id}
                                porcentagem={porcentagem}
                                linkCasa={linkCasa}
                                minima={minima}
                                padrao={padrao}
                                maxima={maxima}
                                nomeJogo={nomeJogo}
                                categoriaJogo={categoriaJogo}
                            />
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
                    {loading && visibleCards.length < filteredCards.length && <p className="text-zinc-50">Carregando...</p>}
                </div>
            </div>
        </section>
    );
}
