'use client'

import { useState, useEffect } from 'react'
import { Download, Share, Smartphone } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function MultiPlatformInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

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
        setIsStandalone(true)
      } else {
        console.log('Instalação do PWA foi recusada')
      }

      setDeferredPrompt(null)
    }
  }

  if (!isMounted) {
    return null // or a loading placeholder
  }

  if (isStandalone) {
    return (
      <Button disabled className="w-full sm:w-auto opacity-50 cursor-not-allowed">
        Já instalado
      </Button>
    )
  }

  return (
    <Button
      className="w-full sm:w-auto"
      onClick={handleInstallClick}
    >
      {isIOS ? (
        <>
          <Smartphone className="mr-2 h-5 w-5" />
          Instalar no iOS
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
    </Button>
  )
}