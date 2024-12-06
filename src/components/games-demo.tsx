'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'

interface Game {
  name: string;
  slug: string;
  id: string;
  image: string;
  bgImage: string;
}

interface GamePageClientProps {
  currentGame: Game;
  otherGames: Game[];
  novoLink?: string;
}

export default function GamePageClient({ currentGame, otherGames, novoLink }: GamePageClientProps) {
  const router = useRouter()
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [showOverlay, setShowOverlay] = useState(true)
  const [iframeLoaded, setIframeLoaded] = useState(false)

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen)
  }

  const handleGameClick = (slug: string) => {
    router.push(`/demo/${slug}`)
  }

  const handlePlayDemo = () => {
    setShowOverlay(false)
    setIframeLoaded(true)
  }

  const handlePlayForReal = () => {
    if (novoLink) {
      window.open(novoLink, '_blank')
    } else {
      console.error('Link para jogar não encontrado')
    }
  }

  return (
    <div className={`container mx-auto relative ${isFullScreen ? 'p-0' : 'p-4'}`}>
      {!isFullScreen && (
        <Link href="/" className="inline-block mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Voltar para o início
        </Link>
      )}
      {!isFullScreen && (<h1 className="text-3xl font-bold mb-6">{currentGame.name} Demo</h1>)}
      <div 
        className={`relative shadow-xl ${isFullScreen ? 'fixed inset-0 z-50 bg-black h-screen top-0' : 'h-[600px]'}`}
        style={{
          backgroundImage: `url(${currentGame.bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {showOverlay && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-20">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Escolha como jogar</h2>
              <div className="flex space-x-4">
                <button 
                  onClick={handlePlayDemo}
                  className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                >
                  Jogar Demo
                </button>
                <button 
                  onClick={handlePlayForReal}
                  className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
                >
                  Jogar para Valer
                </button>
              </div>
            </div>
          </div>
        )}
        {iframeLoaded && (
          <iframe
            src={`https://m.pgsoft-games.com/${currentGame.id}/index.html?l=pt&ot=ca7094186b309ee149c55c8822e7ecf2&btt=2&from=https://pgdemo.asia/&language=pt-BR&__refer=m.pg-redirect.net&or=static.pgsoft-games.com`}
            className="w-full h-full border-0 shadow-2xl"
            allow="autoplay; fullscreen"
          />
        )}
        <button
          onClick={toggleFullScreen}
          className={`absolute ${isFullScreen ? 'top-4 right-4' : 'top-2 right-2'} bg-green-500 text-white px-2 py-1 rounded z-30 text-xs`}
        >
          {isFullScreen ? 'Fechar Tela Cheia' : 'Tela Cheia'}
        </button>
      </div>
      {!isFullScreen && (
        <>
          <h2 className="text-2xl font-bold mt-8 mb-4">Outros Jogos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherGames.map((game) => (
              <Card 
                key={game.slug} 
                className="cursor-pointer overflow-hidden border-none bg-white/90 backdrop-blur-lg text-black relative " 
                onClick={() => handleGameClick(game.slug)}
              >
                <CardContent className="p-0 relative z-10 h-full flex flex-col justify-between">
                  <div className="relative h-40">
                    <Image
                      src={game.image}
                      alt={`Imagem do jogo ${game.name}`}
                      layout="fill"
                      quality={100}
                      priority
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-lg font-semibold hover:underline">
                      {game.name}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

