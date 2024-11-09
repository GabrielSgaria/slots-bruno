import { NextRequest, NextResponse } from 'next/server'
import { getPendingNotifications, markNotificationAsSent } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const pendingNotifications = await getPendingNotifications()
    
    if (pendingNotifications.length === 0) {
      return NextResponse.json({ notifications: [] })
    }

    // Marcar as notificações como enviadas
    await Promise.all(pendingNotifications.map(notification => 
      markNotificationAsSent(notification.id)
    ))

    console.log(`${pendingNotifications.length} notificações enviadas`)

    return NextResponse.json({ notifications: pendingNotifications })
  } catch (error) {
    console.error('Erro ao buscar ou processar notificações pendentes:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export const dynamic = 'force-dynamic'