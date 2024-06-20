'use client'
import { useEffect, useState } from "react";
import { CardData } from "./section-cards-pg";

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
        <div className="w-[300px] flex items-center justify-center py-5">
            <input
                type="text"
                placeholder="Buscar jogo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 rounded-lg border border-gray-300 text-zinc-950 text-sm focus-visible:ring-1 focus-visible:ring-green-400 outline-none"
            />
        </div>
    );
}
