'use client'

import { useEffect, useState, useMemo, useCallback, useRef } from "react"
import { DotFilledIcon } from "@radix-ui/react-icons"
import { CardGames } from "./card-games"
import { SearchFilter } from "./filter-cards"
import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import Loading from "@/components/loading-cards"
import Image from "next/image"

export interface CardData {
  id: number
  nomeJogo: string
  categoriaJogo: string
  porcentagem: number
  minima: number
  padrao: number
  maxima: number
  colorBgGame: string
  updatedAt: string | number | Date
}

interface SectionCardsPpProps {
  cards: CardData[] | null | undefined
  linkCasa: string | null | undefined
}

const newGames = [
  'Tigre Sortudo',
  'Buffalo King Untamed Megaways',
  'Hand of Midas 2',
  'Mustang Gold Megaways',
]

const CARDS_PER_PAGE = 5

export function SectionCardsPP({ cards, linkCasa }: SectionCardsPpProps) {
  const [filteredCards, setFilteredCards] = useState<CardData[]>(cards || [])
  const [displayedCards, setDisplayedCards] = useState<CardData[]>([])
  const [activeTab, setActiveTab] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const loader = useRef(null)

  const isHot = useCallback((card: CardData) =>
    card.minima > 90 || card.padrao > 90 || card.maxima > 90,
    [])

  const sortedNewGames = useMemo(() => {
    if (!cards) return []
    const newGamesFiltered = cards.filter(card =>
      newGames.some(newGame => card.nomeJogo.toLowerCase().includes(newGame.toLowerCase()))
    )
    return newGamesFiltered.sort((a, b) => {
      const indexA = newGames.findIndex(game => a.nomeJogo.toLowerCase().includes(game.toLowerCase()))
      const indexB = newGames.findIndex(game => b.nomeJogo.toLowerCase().includes(game.toLowerCase()))
      return indexA - indexB
    })
  }, [cards])

  const applyFilters = useCallback(() => {
    setIsLoading(true)
    if (!cards) return setFilteredCards([])

    let result = [...cards]

    switch (activeTab) {
      case "hot":
        result = result.filter(card => isHot(card) || card.porcentagem > 90)
        break
      case "new":
        result = sortedNewGames
        break
      case "all":
      default:
        result.sort((a, b) => a.id - b.id)
        break
    }

    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase()
      result = result.filter(card =>
        card.nomeJogo.toLowerCase().includes(lowerCaseSearch)
      )
    }

    setFilteredCards(result)
    setPage(1)
    setDisplayedCards(result.slice(0, CARDS_PER_PAGE))
    setIsLoading(false)
  }, [cards, activeTab, searchTerm, isHot, sortedNewGames])

  useEffect(() => {
    applyFilters()
  }, [applyFilters])

  const loadMoreCards = useCallback(() => {
    const nextPage = page + 1
    const start = (nextPage - 1) * CARDS_PER_PAGE
    const end = nextPage * CARDS_PER_PAGE
    const newCards = filteredCards.slice(start, end)
    setDisplayedCards(prev => [...prev, ...newCards])
    setPage(nextPage)
  }, [page, filteredCards])

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    }

    const observer = new IntersectionObserver((entries) => {
      const target = entries[0]
      if (target.isIntersecting && displayedCards.length < filteredCards.length) {
        loadMoreCards()
      }
    }, options)

    const currentLoader = loader.current
    if (currentLoader) {
      observer.observe(currentLoader)
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader)
      }
    }
  }, [displayedCards.length, filteredCards.length, loadMoreCards])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    toast({
      title: `Jogos ${value === 'hot' ? 'populares e +90%' : value === 'new' ? 'novos' : 'todos'} selecionados`,
      description: `Mostrando ${value === 'all' ? 'todos os jogos' : value === 'hot' ? 'jogos HOT e +90%' : '20 jogos mais recentes'}.`,
      className: "bg-green-500 border-none text-white font-bold",
      duration: 2000
    })
  }

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

      <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {isLoading ? (
        <Loading />
      ) : linkCasa ? (
        <div className='relative grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-9 gap-2 my-5'>
          <div className="w-[72px] absolute z-50 -left-6 -top-[27px] pointer-events-none">
            <Image
              src="/image/natal/gorro.png"
              alt="Banner de Natal"
              width={1920}
              height={1080}
              className="w-full h-auto object-cover object-bottom"
              priority={true}
              quality={100}
            />
          </div>
          <div className="w-[72px] absolute z-50 -right-[26px] -top-[47px] pointer-events-none">
            <Image
              src="/image/natal/elemento-direita.png"
              alt="Banner de Natal"
              width={1920}
              height={1080}
              className="w-full h-auto object-cover object-bottom"
              priority={true}
              quality={100}
            />
          </div>

          {displayedCards.map(({ id, nomeJogo, porcentagem, minima, padrao, maxima, categoriaJogo, colorBgGame }) => (
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
      ) : (
        <div className="flex justify-center items-center flex-col">
          <p className="text-zinc-50 text-xl uppercase font-bold flex">
            Link não encontrado <DotFilledIcon className="size-8 text-red-600 animate-ping text-center" />
          </p>
          <p className="text-zinc-500">atualize na página do administrador</p>
        </div>
      )}
      {!isLoading && displayedCards.length < filteredCards.length && (
        <div ref={loader} className="w-full h-10 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
        </div>
      )}
    </section>
  )
}