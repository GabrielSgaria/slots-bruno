'use client'

import { useEffect, useRef } from 'react'
import { setHours, setMinutes, addDays, isBefore } from 'date-fns'
import { toZonedTime, formatInTimeZone } from 'date-fns-tz'

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

const TIMEZONE = 'America/Sao_Paulo'

export function NotificationHandler() {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const checkForNotifications = async () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      const registration = await navigator.serviceWorker.ready
      console.log('Service Worker está pronto')

      try {
        const response = await fetch('/api/notifications')
        const data = await response.json()

        if (data.notifications && data.notifications.length > 0) {
          data.notifications.forEach((notification: Notification) => {
            registration.showNotification(notification.title, {
              body: notification.body,
              icon: notification.icon || '/favicon.png',
              tag: notification.type,
              data: {
                url: notification.url || '/',
              },
            })
          })
        }
      } catch (error) {
        console.error('Erro ao buscar ou exibir notificações:', error)
      }
    }
  }

  const scheduleNextNotification = () => {
    const now = toZonedTime(new Date(), TIMEZONE)
    let nextNotificationTime = null

    for (const time of NOTIFICATION_TIMES) {
      const notificationTime = setMinutes(setHours(now, time.hour), time.minute)
      if (isBefore(now, notificationTime)) {
        nextNotificationTime = notificationTime
        break
      }
    }

    if (!nextNotificationTime) {
      // Se passamos de todos os horários hoje, agende para o primeiro horário do dia seguinte
      nextNotificationTime = setMinutes(
        setHours(addDays(now, 1), NOTIFICATION_TIMES[0].hour),
        NOTIFICATION_TIMES[0].minute
      )
    }

    const msUntilNextNotification = nextNotificationTime.getTime() - now.getTime()

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      checkForNotifications()
      scheduleNextNotification()
    }, msUntilNextNotification)

    console.log(
      `Próxima notificação agendada para ${formatInTimeZone(
        nextNotificationTime,
        TIMEZONE,
        'dd/MM/yyyy HH:mm:ss'
      )}`
    )
  }

  useEffect(() => {
    scheduleNextNotification()

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return null
}