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
        <div className="w-full flex items-center justify-center py-5 max-w-[600px] ">
            <input
                type="text"
                placeholder="Buscar jogo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className=" text-zinc-50 placeholder:text-zinc-50/60 placeholder:italic bg-green-600/90 w-full p-2 rounded-lg  text-sm focus-visible:ring-1 focus-visible:ring-green-400 outline-none shadow-black shadow-inner"
            />
        </div>
    );
}
