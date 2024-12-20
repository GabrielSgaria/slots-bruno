'use client';

import { useEffect, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion"
import { DotFilledIcon } from "@radix-ui/react-icons";
import { CardGames } from "./card-games";
import { SearchFilter } from "./filter-cards";
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

interface SectionCardsPgProps {
  cards: CardData[] | null | undefined;
  linkCasa: string | null | undefined;
}

const newGames = [
  'Wild ape',
  'Zombie Outbreak',
  'futebol fever',
  'battleground royale',
  'butterfly blossom',
  'dragon hatch 2',
  'medusa II',
  `santa's gift rush`
];

export function SectionCards({ cards, linkCasa }: SectionCardsPgProps) {
  const [filteredCards, setFilteredCards] = useState<CardData[]>(cards || []);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const isHot = useCallback((card: CardData) =>
    card.nomeJogo.toLowerCase().startsWith('fortune') &&
    (card.minima > 90 || card.padrao > 90 || card.maxima > 90) &&
    card.categoriaJogo === "PG",
  []);

  const isPlayGame = useCallback((card: CardData) =>
    (card.categoriaJogo === 'PP' ||
      (!card.nomeJogo.toLowerCase().startsWith('fortune') &&
        card.categoriaJogo === 'PG')) &&
    (card.minima > 90 || card.padrao > 90 || card.maxima > 90),
  []);

  const applyFilters = useCallback(() => {
    let result = cards || [];

    // Apply tab filter
    switch (activeTab) {
      case "hot":
        result = result.filter(card => isHot(card) || isPlayGame(card));
        break;
      case "new":
        result = result.filter(card =>
          newGames.some(newGame => card.nomeJogo.toLowerCase().includes(newGame.toLowerCase()))
        );
        break;
      case "all":
      default:
        break;
    }

    // Apply search filter
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      result = result.filter(
        ({ nomeJogo }) => nomeJogo.toLowerCase().includes(lowerCaseSearch)
      );
    }

    setFilteredCards(result);
  }, [cards, activeTab, searchTerm, isHot, isPlayGame]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    toast({
      title: `Jogos ${value === 'hot' ? 'populares' : value === 'new' ? 'novos' : 'todos'} selecionados`,
      description: `Mostrando ${value === 'all' ? 'todos os jogos' : value === 'hot' ? 'jogos HOT e +90%' : 'jogos novos selecionados'}.`,
      className: "bg-green-500 border-none text-white font-bold",
    });
  };

  return (
    <section className="flex flex-col mx-auto items-center justify-center px-2 -mt-6">
      {linkCasa ? (
        <div className="flex flex-col justify-center items-center md:px-16 rounded-2xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full mt-4 flex items-center justify-center pt-3"
          >
            <Tabs defaultValue="all" className="w-full max-w-md" onValueChange={handleTabChange}>
              <TabsList className="flex w-full justify-between bg-transparent rounded-xl p-1 shadow-inner gap-1 ">
                <TabsTrigger
                  value="hot"
                  className="w-1/3 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300
                       bg-yellow-400 text-yellow-900
                       data-[state=active]:bg-green-500 data-[state=active]:text-white data-[state=active]:shadow-md
                       hover:bg-yellow-300 hover:text-yellow-950"
                >
                  🔥 HOT
                </TabsTrigger>
                <TabsTrigger
                  value="new"
                  className="w-1/3 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300
                       bg-yellow-400 text-yellow-900
                       data-[state=active]:bg-green-500 data-[state=active]:text-white data-[state=active]:shadow-md
                       hover:bg-yellow-300 hover:text-yellow-950"
                >
                  ✨ NEW
                </TabsTrigger>
                <TabsTrigger
                  value="all"
                  className="w-1/3 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300
                       bg-yellow-400 text-yellow-900
                       data-[state=active]:bg-green-500 data-[state=active]:text-white data-[state=active]:shadow-md
                       hover:bg-yellow-300 hover:text-yellow-950"
                >
                  ALL
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>

          <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-9 gap-2 my-5">
            {filteredCards.map(({ id, nomeJogo, porcentagem, minima, padrao, maxima, categoriaJogo, colorBgGame }) => (
              <div key={id}>
                <CardGames
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