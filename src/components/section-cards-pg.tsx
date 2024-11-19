'use client';

import { useEffect, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { CardGames } from "./card-games";
import { SearchFilter } from "./filter-cards";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

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
  'Wild Ape',
  'Wings of Iguazu',
  'Pinata Wins',
  'Mystic Potion',
  'Anubis Wrath',
  'Zombie Outbreak',
  'Futebol Fever',
  'Shark Bounty',
  'Yakuza Honor',
  'Wings of Iguazu',
  'Three Crazy Piggies',
  'Oishi Delights',
  'Safari Wilds',
  `Gladiator's Glory`,
  'Ultimate Striker',
  'Wild Heist Cashout',
];

export function SectionCards({ cards, linkCasa }: SectionCardsPgProps) {
  const [filteredCards, setFilteredCards] = useState<CardData[]>(cards || []);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  // Função de filtro unificada para HOT e PlayGame
  const isRelevantGame = useCallback((card: CardData) => {
    const isFortuneGame = card.nomeJogo.toLowerCase().startsWith('fortune');
    const isHighPercentage = card.minima > 90 || card.padrao > 90 || card.maxima > 90;
    if (isFortuneGame && card.categoriaJogo === "PG" && isHighPercentage) return true;
    if (!isFortuneGame && isHighPercentage && card.categoriaJogo === "PP") return true;
    return false;
  }, []);

  // Filtro para jogos novos
  const newGamesSet = useMemo(() => new Set(newGames.map(game => game.toLowerCase())), []);
  const sortedNewGames = useMemo(() => {
    return (cards || [])
      .filter(card => newGamesSet.has(card.nomeJogo.toLowerCase()))
      .sort((a, b) => {
        const indexA = newGames.findIndex(game => game.toLowerCase() === a.nomeJogo.toLowerCase());
        const indexB = newGames.findIndex(game => game.toLowerCase() === b.nomeJogo.toLowerCase());
        return indexA - indexB;
      });
  }, [cards, newGamesSet]);

  // Aplicar filtros e busca
  const applyFilters = useCallback(() => {
    let result = cards || [];
    switch (activeTab) {
      case "hot":
        result = result.filter(isRelevantGame);
        break;
      case "new":
        result = sortedNewGames;
        break;
      case "all":
      default:
        break;
    }

    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      result = result.filter(card => card.nomeJogo.toLowerCase().includes(lowerCaseSearch));
    }

    setFilteredCards(result);
  }, [cards, activeTab, searchTerm, isRelevantGame, sortedNewGames]);

  // Reaplicar filtros quando necessário
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Alterar a aba ativa
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
              <TabsList className="flex w-full justify-between bg-transparent rounded-xl p-1 shadow-inner gap-1">
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

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-9 gap-2 my-5 relative">
            <div className="w-[72px] absolute z-50 -left-6 -top-[27px] pointer-events-none">
              <Image
                src="/image/natal/gorro.png"
                alt="Banner de Natal"
                width={1920}
                height={280}
                className="w-full h-auto object-cover object-bottom"
                priority={true}
                quality={100}
              />
            </div>
            <div className="w-[72px] absolute z-50 -right-[28px] -top-[47px] pointer-events-none">
              <Image
                src="/image/natal/elemento-direita.png"
                alt="Banner de Natal"
                width={1920}
                height={280}
                className="w-full h-auto object-cover object-bottom"
                priority={true}
                quality={100}
              />
            </div>
            {filteredCards.map(({ id, nomeJogo, porcentagem, minima, padrao, maxima, categoriaJogo, colorBgGame }) => (
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
