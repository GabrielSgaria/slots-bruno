'use client'

import { Download } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const HIDDEN_PATHS = ['/download-app', '/adm']

  export function DownloadAppButton() {
    const pathname = usePathname()

    if (HIDDEN_PATHS.includes(pathname)) {
      return null
    }

    return (
      <Link
        href="/download-app"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-1000 hover:scale-105 animate-bounce"
      >
        <Download className="w-5 h-5" />
        Baixe nosso app
      </Link>
    )
  }