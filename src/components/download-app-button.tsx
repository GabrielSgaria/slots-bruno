'use client'

import { useState, useEffect } from 'react'
import { Download, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const HIDDEN_PATHS = ['/download-app', '/adm', '/pwa']

export function DownloadAppButton() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {

    setIsVisible(true)
  }, [])


  if (HIDDEN_PATHS.includes(pathname) || pathname.startsWith('/pwa/') || !isVisible) {
    return null
  }

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsVisible(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center">
      <Link
        href="/download-app"
        className="text-sm relative flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-full shadow-lg transform transition-all hover:scale-105 duration-700"
      >
        <Download className="w-5 h-5" />
        Baixe nosso app
      </Link>
      <button
        onClick={handleDismiss}
        className="ml-2 text-gray-50 rounded-full p-2 transition-all duration-300 hover:scale-110 absolute -top-10 right-2"
        aria-label="Fechar botão de download"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}