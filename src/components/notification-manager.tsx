// 'use client'

// import { useState, useEffect } from 'react'
// import { Button } from "@/components/ui/button"

// export function NotificationManager() {
//   const [isSupported, setIsSupported] = useState(false)
//   const [permission, setPermission] = useState<NotificationPermission>('default')

//   useEffect(() => {
//     const checkSupport = async () => {
//       const supported = 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window
//       setIsSupported(supported)

//       if (supported) {
//         const currentPermission = await Notification.requestPermission()
//         setPermission(currentPermission)

//         if (currentPermission === 'granted') {
//           registerServiceWorker()
//         }
//       }
//     }

//     checkSupport()
//   }, [])

//   const registerServiceWorker = async () => {
//     try {
//       const registration = await navigator.serviceWorker.register('/sw.js')
//       console.log('Service Worker registrado com sucesso:', registration)
//     } catch (error) {
//       console.error('Falha ao registrar o Service Worker:', error)
//     }
//   }

//   const requestPermission = async () => {
//     try {
//       const result = await Notification.requestPermission()
//       setPermission(result)
//       if (result === 'granted') {
//         registerServiceWorker()
//       }
//     } catch (error) {
//       console.error('Erro ao solicitar permissão:', error)
//     }
//   }

//   if (!isSupported) {
//     return <p className="text-sm text-muted-foreground">Notificações não são suportadas neste navegador.</p>
//   }

//   return (
//     <div className="flex flex-col items-center space-y-4">
//       {permission === 'granted' ? (
//         <p className="text-sm text-green-600">Notificações estão ativadas.</p>
//       ) : permission === 'denied' ? (
//         <p className="text-sm text-red-600">Notificações foram bloqueadas. Por favor, altere as configurações do seu navegador para permitir notificações.</p>
//       ) : (
//         <Button onClick={requestPermission}>Ativar Notificações</Button>
//       )}
//     </div>
//   )
// }