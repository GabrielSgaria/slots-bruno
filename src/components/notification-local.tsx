'use client'

import { useEffect, useState } from 'react'
import styles from './LocalNotificationHandler.module.css'

interface Notification {
  id: number
  title: string
  body: string
  icon?: string
  type: string
  url?: string
}

const NOTIFICATION_TIMES = [
  { hour: 9, minute: 0 },
  { hour: 19, minute: 0 },
  { hour: 23, minute: 30 }
]

export function LocalNotificationHandler() {
  const [deviceType, setDeviceType] = useState<'desktop' | 'mobile'>('desktop')
  const [browserType, setBrowserType] = useState<'chrome' | 'firefox' | 'safari' | 'other'>('other')

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    setDeviceType(isMobile ? 'mobile' : 'desktop')

    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
    const isFirefox = /Firefox/.test(navigator.userAgent)
    const isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)
    
    if (isChrome) setBrowserType('chrome')
    else if (isFirefox) setBrowserType('firefox')
    else if (isSafari) setBrowserType('safari')
    else setBrowserType('other')
  }, [])

  const showCustomNotification = (notification: Notification) => {
    const notificationContainer = document.createElement('div')
    notificationContainer.className = styles.notificationContainer
    
    const notificationElement = document.createElement('div')
    notificationElement.className = `${styles.notification} ${styles[deviceType]} ${styles[browserType]}`
    notificationElement.innerHTML = `
      <div class="${styles.notificationIcon}">
        <img src="${notification.icon || '/favicon.png'}" alt="Notification Icon" />
      </div>
      <div class="${styles.notificationContent}">
        <h3>${notification.title}</h3>
        <p>${notification.body}</p>
      </div>
    `
    
    notificationContainer.appendChild(notificationElement)
    document.body.appendChild(notificationContainer)

    setTimeout(() => {
      notificationContainer.classList.add(styles.show)
    }, 100)

    setTimeout(() => {
      notificationContainer.classList.remove(styles.show)
      setTimeout(() => {
        document.body.removeChild(notificationContainer)
      }, 300)
    }, 5000)
  }

  const checkForUpdates = async () => {
    try {
      const response = await fetch('/api/notifications')
      const data = await response.json()
      
      if (data.notifications && data.notifications.length > 0) {
        data.notifications.forEach((notification: Notification) => {
          if ("Notification" in window && deviceType === 'desktop') {
            if (Notification.permission !== "granted") {
              Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                  new Notification(notification.title, {
                    body: notification.body,
                    icon: notification.icon || '/favicon.png'
                  })
                } else {
                  showCustomNotification(notification)
                }
              })
            } else {
              new Notification(notification.title, {
                body: notification.body,
                icon: notification.icon || '/favicon.png'
              })
            }
          } else {
            showCustomNotification(notification)
          }
        })
      }
    } catch (error) {
      console.error('Erro ao buscar notificações:', error)
    }
  }

  const scheduleNextNotification = () => {
    const now = new Date()
    const currentTime = now.getHours() * 60 + now.getMinutes()
    
    let nextNotificationTime = NOTIFICATION_TIMES[0]
    let minDiff = Infinity

    for (const time of NOTIFICATION_TIMES) {
      const timeInMinutes = time.hour * 60 + time.minute
      let diff = timeInMinutes - currentTime
      if (diff < 0) diff += 24 * 60 // Se for negativo, adiciona 24 horas

      if (diff < minDiff) {
        minDiff = diff
        nextNotificationTime = time
      }
    }

    const msUntilNextNotification = minDiff * 60 * 1000
    return msUntilNextNotification
  }

  useEffect(() => {
    const scheduleNotifications = () => {
      const msUntilNextNotification = scheduleNextNotification()
      
      setTimeout(() => {
        checkForUpdates()
        scheduleNotifications() // Agenda a próxima notificação
      }, msUntilNextNotification)
    }

    scheduleNotifications() // Inicia o agendamento

    // Não é necessário retornar uma função de limpeza, pois o agendamento é contínuo
  }, [])

  return null
}