'use client'

import { Star, HelpCircle } from 'lucide-react'
import { MultiPlatformInstallButton } from '@/components/install-pwa-button'
import Image from 'next/image'

export default function DownloadPage() {
  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-50 min-h-screen rounded-xl shadow-md">
      <div className="flex items-start space-x-4 mb-6">
        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-blue-100">
          <Image
            width={500}
            height={500}
            quality={100}
            priority
            src="/favicon.png"
            alt="App icon"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold mb-1">Nosso App</h1>
          <div className="flex items-center space-x-2 mb-4">
            <button className="text-blue-500 flex items-center">
              <HelpCircle className="w-4 h-4 mr-1" />
              Tutorial de instalação
            </button>
          </div>
          <MultiPlatformInstallButton />
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <span className="text-4xl font-bold">4.9</span>
          <div className="flex">
            {Array(5).fill(null).map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
              />
            ))}
          </div>
        </div>
        <div className="text-sm text-gray-500">
          <span className="font-semibold">9999+</span> Avaliações
        </div>
      </div>

      <div className="mb-8">
        <div className="text-2xl font-bold mb-4">4.9 em 5 pontos</div>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center">
              <div className="flex items-center w-24">
                {Array(5).fill(null).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill={i < rating ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
              <div className="flex-1 ml-4">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-yellow-400 rounded-full"
                    style={{
                      width: rating === 5 ? '85%' :
                        rating === 4 ? '10%' :
                          rating === 3 ? '3%' :
                            rating === 2 ? '1%' : '1%'
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between py-3 border-b">
          <span className="text-gray-600">compatibilidade</span>
          <span className="text-gray-900">Android, iOS, Desktop</span>
        </div>
        <div className="flex justify-between py-3 border-b">
          <span className="text-gray-600">tamanho</span>
          <span className="text-gray-900">&lt; 470 KB</span>
        </div>
        <div className="flex justify-between py-3 border-b">
          <span className="text-gray-600">última atualização</span>
          <span className="text-gray-900">2024-11-10 14:59:55</span>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded-lg text-sm text-gray-600">
        <h3 className="font-semibold mb-2">Declaração de isenção:</h3>
        <p>Este aplicativo é fornecido como um Progressive Web App (PWA) e um perfil de configuração para iOS. O conteúdo e funcionalidade são responsabilidade do desenvolvedor.</p>
      </div>
    </div>
  )
}