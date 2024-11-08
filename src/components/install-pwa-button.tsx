'use client'

import { useState, useEffect } from 'react'
import { Download, Share, Smartphone } from 'lucide-react'

export function MultiPlatformInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    const checkPlatform = () => {
      setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream)
      setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    checkPlatform()

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (isIOS) {
      alert('Para instalar no iOS:\n1. Toque no ícone de compartilhamento\n2. Escolha "Adicionar à Tela de Início"')
    } else if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      
      if (outcome === 'accepted') {
        console.log('PWA foi instalado')
      } else {
        console.log('Instalação do PWA foi recusada')
      }

      setDeferredPrompt(null)
    }
  }

  if (isStandalone) {
    return null // O app já está instalado, não mostramos o botão
  }

  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-3 px-6 flex items-center justify-center font-semibold transition duration-300 ease-in-out"
      onClick={handleInstallClick}
    >
      {isIOS ? (
        <>
          <Smartphone className="mr-2 h-5 w-5" />
          Adicionar à Tela Inicial (iOS)
        </>
      ) : deferredPrompt ? (
        <>
          <Download className="mr-2 h-5 w-5" />
          Instalar App
        </>
      ) : (
        <>
          <Share className="mr-2 h-5 w-5" />
          Adicionar à Tela Inicial
        </>
      )}
    </button>
  )
}