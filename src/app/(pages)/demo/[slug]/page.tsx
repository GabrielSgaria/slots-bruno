'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'

const games = [
  { name: 'Fortune Tiger', slug: 'fortune-tiger', id: '126', image: 'https://imagedelivery.net/6tAoXewsW-UbrMK1VkE8GQ/e3a5c3bb-4658-46c9-ac5a-2d6b02e56f00/public' },
  { name: 'Fortune Rabbit', slug: 'fortune-rabbit', id: '1543462', image: 'https://imagedelivery.net/6tAoXewsW-UbrMK1VkE8GQ/268fcfd5-c2d3-4267-538d-7babc1b8ea00/public' },
  { name: 'Fortune Ox', slug: 'fortune-ox', id: '98', image: 'https://imagedelivery.net/6tAoXewsW-UbrMK1VkE8GQ/321ceb3a-cb3c-42b7-7f5f-7c2df8dbd500/public' },
  { name: 'Fortune Mouse', slug: 'fortune-mouse', id: '68', image: 'https://imagedelivery.net/6tAoXewsW-UbrMK1VkE8GQ/7b3350b7-27d4-4d7e-aa8c-515160187c00/public' },
  { name: 'Fortune Dragon', slug: 'fortune-dragon', id: '1695365', image: 'https://imagedelivery.net/6tAoXewsW-UbrMK1VkE8GQ/07001f8e-4183-40e7-8793-4524eaba5100/public' },
]

export default function GamePage() {
  const params = useParams()
  const router = useRouter()
  const [isFullScreen, setIsFullScreen] = useState(false)
  const gameName = params.slug ? params.slug.toString().replace(/%20/g, '-').toLowerCase() : ''
  const currentGame = games.find(game => game.slug === gameName)
  const otherGames = games.filter(game => game.slug !== gameName)

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen)
  }

  const handleGameClick = (slug: string) => {
    router.push(`/demo/${slug}`)
  }

  if (!currentGame) {
    return <div>Jogo não encontrado</div>
  }

  return (
    <div className={`container mx-auto relative ${isFullScreen ? 'p-0' : 'p-4'}`} >
      {!isFullScreen && (<Link href="/" className="inline-block mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Voltar para o início
      </Link>)}
      {!isFullScreen && (<h1 className="text-3xl font-bold mb-6">{currentGame.name} Demo</h1>)}
      <div className={`relative shadow-xl ${isFullScreen ? 'fixed inset-0 z-50 bg-transparent h-screen top-0' : ''}`}>
        <iframe
          src={`https://m.pgsoft-games.com/${currentGame.id}/index.html?l=pt&ot=ca7094186b309ee149c55c8822e7ecf2&btt=2&from=https://pgdemo.asia/&language=pt-BR&__refer=m.pg-redirect.net&or=static.pgsoft-games.com`}
          className={`w-full ${isFullScreen ? 'h-full' : 'h-[600px] rounded-xl'} border-0 shadow-2xl`}
          allow="autoplay; fullscreen"
        />
        <button
          onClick={toggleFullScreen}
          className={`absolute ${isFullScreen ? 'top-4 right-4' : 'top-2 right-2'} bg-green-500 text-white px-2 py-1 rounded z-10 text-xs`}
        >
          {isFullScreen ? 'Fechar Tela Cheia' : 'Tela Cheia'}
        </button>
      </div>
      {!isFullScreen && (
        <>
          <h2 className="text-2xl font-bold mt-8 mb-4">Outros Jogos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherGames.map((game) => (
              <Card key={game.slug} className="cursor-pointer overflow-hidden border-none backdrop-blur-md bg-white/20 text-white" onClick={() => handleGameClick(game.slug)}>
                <CardContent className="p-0">
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