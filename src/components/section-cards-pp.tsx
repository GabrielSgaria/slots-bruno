'use client'

import { useEffect, useState, useMemo } from "react";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { CardGames } from "./card-games";
import { SearchFilter } from "./filter-cards";
import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export interface CardData {
    id: number;
    nomeJogo: string;
    categoriaJogo: string;
    porcentagem: number;
    minima: number;
    padrao: number;
    maxima: number;
    colorBgGame: string;
    updatedAt: string | number | Date;
}

interface SectionCardsPpProps {
    cards: CardData[] | null | undefined;
    linkCasa: string | null | undefined;
}

export function SectionCardsPP({ cards, linkCasa }: SectionCardsPpProps) {
    const [filteredCards, setFilteredCards] = useState<CardData[]>(cards || []);
    const [activeTab, setActiveTab] = useState<string>("all");
    const { toast } = useToast();

    const isHot = useMemo(() => (card: CardData) =>
        (card.minima > 90 || card.padrao > 90 || card.maxima > 90),
        []);

    useEffect(() => {
        setFilteredCards(cards || []);
    }, [cards]);

    const handleTabChange = (value: string) => {
        setActiveTab(value);
        let filteredGames: CardData[] = [];

        switch (value) {
            case "hot":
                filteredGames = (cards || []).filter(card => isHot(card));
                break;
            case "new":
                filteredGames = (cards || []).sort((a, b) => {
                    const dateA = new Date(a.updatedAt);
                    const dateB = new Date(b.updatedAt);
                    return dateB.getTime() - dateA.getTime();
                }).slice(0, 20);
                break;
            case "all":
            default:
                filteredGames = (cards || []).sort((a, b) => a.id - b.id);
                break;
        }

        setFilteredCards(filteredGames);
        toast({
            title: `Jogos ${value === 'hot' ? 'populares' : value === 'new' ? 'novos' : 'todos'} selecionados`,
            description: `Mostrando os ${value === 'all' ? 'todos os jogos' : value === 'hot' ? 'jogos HOT e +90%' : '20 jogos mais recentes'}.`,
            className: "bg-green-500 border-none text-white font-bold",
            duration: 2000
        });
    };

    return (
        <section className="flex flex-col mx-auto items-center justify-center px-2">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Tabs defaultValue="all" className="w-full mt-4 flex items-center justify-center" onValueChange={handleTabChange}>
                    <TabsList className="flex w-fit bg-yellow-400 rounded-lg p-1">
                        <TabsTrigger
                            value="hot"
                            className="px-4 py-2 text-sm rounded-md transition-all text-black
                                     data-[state=active]:bg-green-500 data-[state=active]:text-white"
                        >
                            🔥 HOT
                        </TabsTrigger>
                        <TabsTrigger
                            value="new"
                            className="px-4 py-2 text-sm rounded-md transition-all text-black
                                     data-[state=active]:bg-green-500 data-[state=active]:text-white"
                        >
                            ✨ NEW
                        </TabsTrigger>
                        <TabsTrigger
                            value="all"
                            className="px-4 py-2 text-sm rounded-md transition-all text-black
                                     data-[state=active]:bg-green-500 data-[state=active]:text-white"
                        >
                            ALL
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </motion.div>

            <SearchFilter cardsProps={{ data: filteredCards }} setFilteredCards={setFilteredCards} />

            {linkCasa ? (
                <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-9 gap-2 my-5'>
                    {filteredCards.map(({ id, nomeJogo, porcentagem, minima, padrao, maxima, categoriaJogo, colorBgGame }, index) => (
                        <div key={id}>
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
                                colorBgGame={colorBgGame}
                            />
                        </div>
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
        </section>
    );
}