/* eslint-disable react/no-unescaped-entities */
'use client'

import { useState, useEffect } from 'react'
import { Download, Share, Smartphone, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function MultiPlatformInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [showIOSInstructions, setShowIOSInstructions] = useState(false)

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
      setShowIOSInstructions(true)
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

  if (isStandalone) {
    return (
      <Button disabled className="w-full sm:w-auto opacity-50 cursor-not-allowed">
        Já instalado
      </Button>
    )
  }

  return (
    <>
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

      <Dialog open={showIOSInstructions} onOpenChange={setShowIOSInstructions} >
        <DialogContent className="text-black">
          <DialogHeader>
            <DialogTitle>Como instalar no iOS</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-black">
            <p>Siga estes passos para adicionar o app à sua tela inicial:</p>
            <ol className="list-decimal list-inside space-y-2 text-black">
              <li>Toque no ícone de compartilhamento <Share className="inline h-5 w-5 text-blue-500" /></li>
              <li>Role para baixo e toque em "Adicionar à Tela de Início"</li>
              <li>Toque em "Adicionar" no canto superior direito</li>
            </ol>
            <p>Após estes passos, o app aparecerá na sua tela inicial como um app nativo!</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}