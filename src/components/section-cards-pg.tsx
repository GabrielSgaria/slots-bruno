'use client';

import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { CardGames } from "./card-games";
import { SearchFilter } from "./filter-cards";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Loading from "@/components/loading-cards";

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

const CARDS_PER_PAGE = 5;

export function SectionCards({ cards, linkCasa }: SectionCardsPgProps) {
  const [filteredCards, setFilteredCards] = useState<CardData[]>(cards || []);
  const [displayedCards, setDisplayedCards] = useState<CardData[]>([]);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const loader = useRef(null);

  const isHot = useCallback((card: CardData) =>
    card.minima > 90 || card.padrao > 90 || card.maxima > 90 || card.porcentagem > 90,
    []);

  const sortedNewGames = useMemo(() => {
    if (!cards) return [];
    const newGamesFiltered = cards.filter(card =>
      newGames.some(newGame => card.nomeJogo.toLowerCase().includes(newGame.toLowerCase()))
    );
    return newGamesFiltered.sort((a, b) => {
      const indexA = newGames.findIndex(game => a.nomeJogo.toLowerCase().includes(game.toLowerCase()));
      const indexB = newGames.findIndex(game => b.nomeJogo.toLowerCase().includes(game.toLowerCase()));
      return indexA - indexB;
    });
  }, [cards]);

  const applyFilters = useCallback(() => {
    setIsLoading(true);
    if (!cards) return setFilteredCards([]);

    let result = [...cards];

    switch (activeTab) {
      case "hot":
        result = result.filter(isHot);
        break;
      case "new":
        result = sortedNewGames;
        break;
      case "all":
      default:
        result.sort((a, b) => a.id - b.id);
        break;
    }

    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      result = result.filter(card =>
        card.nomeJogo.toLowerCase().includes(lowerCaseSearch)
      );
    }

    setFilteredCards(result);
    setPage(1);
    setDisplayedCards(result.slice(0, CARDS_PER_PAGE));
    setIsLoading(false);
  }, [cards, activeTab, searchTerm, isHot, sortedNewGames]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const loadMoreCards = useCallback(() => {
    const nextPage = page + 1;
    const start = (nextPage - 1) * CARDS_PER_PAGE;
    const end = nextPage * CARDS_PER_PAGE;
    const newCards = filteredCards.slice(start, end);
    setDisplayedCards(prev => [...prev, ...newCards]);
    setPage(nextPage);
  }, [page, filteredCards]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    };

    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && displayedCards.length < filteredCards.length) {
        loadMoreCards();
      }
    }, options);

    const currentLoader = loader.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [displayedCards.length, filteredCards.length, loadMoreCards]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    toast({
      title: `Jogos ${value === 'hot' ? 'populares e +90%' : value === 'new' ? 'novos' : 'todos'} selecionados`,
      description: `Mostrando ${value === 'all' ? 'todos os jogos' : value === 'hot' ? 'jogos HOT e +90%' : 'jogos novos selecionados'}.`,
      className: "bg-green-500 border-none text-white font-bold",
      duration: 2000
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

          {isLoading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-9 gap-2 my-5 relative">
              {displayedCards.map(({ id, nomeJogo, porcentagem, minima, padrao, maxima, categoriaJogo, colorBgGame }) => (
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
          )}
          {!isLoading && displayedCards.length < filteredCards.length && (
            <div ref={loader} className="w-full h-10 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            </div>
          )}
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
  )}