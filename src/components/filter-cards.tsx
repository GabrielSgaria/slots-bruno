'use client'

import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'

interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export function SearchFilter({ searchTerm, setSearchTerm }: SearchFilterProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div
      className="w-full flex items-center justify-center pt-5 max-w-[570px]"
    >
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-600 h-5 w-5" />
        <Input
          type="text"
          placeholder="Buscar jogo..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border-none rounded-lg text-zinc-950 placeholder:text-zinc-950/60 placeholder:italic bg-yellow-400 w-full py-2 pl-10 pr-4 text-sm focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 focus-visible:ring-offset-yellow-400 outline-none shadow-lg"
        />
      </div>
    </div>
  )
}