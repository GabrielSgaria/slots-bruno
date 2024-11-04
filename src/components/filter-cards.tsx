'use client'
import { useEffect, useState } from "react";
import { CardData } from "./section-cards-pg";
import { motion } from "framer-motion"

interface SearchFilterProps {
    cardsProps: {
        data: CardData[] | null | undefined;
    };
    setFilteredCards: React.Dispatch<React.SetStateAction<CardData[]>>;
}

export function SearchFilter({ cardsProps, setFilteredCards }: SearchFilterProps) {
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (searchTerm === "") {
            setFilteredCards(cardsProps?.data || []);
        } else {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            setFilteredCards(
                (cardsProps?.data || []).filter(({ nomeJogo }) =>
                    nomeJogo.toLowerCase().includes(lowerCaseSearchTerm)
                ) || []
            );
        }
    }, [searchTerm, cardsProps, setFilteredCards]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full flex items-center justify-center px-4 pb-5 max-w-[600px] ">
            <input
                type="text"
                placeholder="Buscar jogo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-xl text-zinc-950 placeholder:text-zinc-950/60 placeholder:italic bg-yellow-fp w-full py-2 px-4 text-sm focus-visible:ring-1 focus-visible:ring-green-600 outline-none shadow-black shadow-inner"
            />
        </motion.div>
    );
}
