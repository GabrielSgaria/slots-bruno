'use client'

import { useEffect, useState } from "react"
import { CardData } from "./section-cards-pg"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchFilterProps {
  cardsProps: {
    data: CardData[] | null | undefined
  }
  setFilteredCards: React.Dispatch<React.SetStateAction<CardData[]>>
}

export function SearchFilter({ cardsProps, setFilteredCards }: SearchFilterProps) {
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredCards(cardsProps?.data || [])
    } else {
      const lowerCaseSearchTerm = searchTerm.toLowerCase()
      setFilteredCards(
        (cardsProps?.data || []).filter(({ nomeJogo }) =>
          nomeJogo.toLowerCase().includes(lowerCaseSearchTerm)
        ) || []
      )
    }
  }, [searchTerm, cardsProps, setFilteredCards])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex items-center justify-center pt-5 max-w-[570px]"
    >
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-600 h-5 w-5" />
        <Input
          type="text"
          placeholder="Buscar jogo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-none rounded-lg text-zinc-950 placeholder:text-zinc-950/60 placeholder:italic bg-yellow-400 w-full py-2 pl-10 pr-4 text-sm focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 focus-visible:ring-offset-yellow-400 outline-none shadow-lg"
        />
      </div>
    </motion.div>
  )
}