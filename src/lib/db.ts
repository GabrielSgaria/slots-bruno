import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

export async function createNotification(title: string, body: string, type: string) {
  return prisma.notification.create({
    data: {
      title,
      body,
      type,
      status: 'pending',
    },
  })
}

export async function getPendingNotifications() {
  return prisma.notification.findMany({
    where: {
      status: 'pending',
    },
    orderBy: {
      createdAt: 'asc',
    },
  })
}

export async function markNotificationAsSent(id: number) {
  return prisma.notification.update({
    where: { id },
    data: {
      status: 'sent',
      sentAt: new Date(),
    },
  })
}

export async function updateCards(cards: any[]) {
  const updatePromises = cards.map(card =>
    prisma.card.upsert({
      where: { id: card.id },
      update: {
        nomeJogo: card.nome,
        categoriaJogo: card.categoria,
        porcentagem: card.porcentagem,
        minima: card.minima,
        padrao: card.padrao,
        maxima: card.maxima,
        colorBgGame: card.colorBgGame,
      },
      create: {
        id: card.id,
        nomeJogo: card.nome,
        categoriaJogo: card.categoria,
        porcentagem: card.porcentagem,
        minima: card.minima,
        padrao: card.padrao,
        maxima: card.maxima,
        colorBgGame: card.colorBgGame,
      },
    })
  )

  return Promise.all(updatePromises)
}

export default prisma