import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex justify-center items-center w-full h-64">
      <Loader2 className="h-12 w-12 animate-spin text-green-500" />
      <span className="ml-2 text-lg font-semibold text-green-500">Carregando jogos...</span>
    </div>
  )
}