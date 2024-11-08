import { PrismaClient } from '@prisma/client';
import { checkAndNotifyHotGames } from '@/lib/game-notification-service';

const prisma = new PrismaClient();

async function simulateHotGames() {
  // Atualiza aleatoriamente os valores dos jogos
  await prisma.card.updateMany({
    data: {
      minima: { set: Math.floor(Math.random() * 101) },
      padrao: { set: Math.floor(Math.random() * 101) },
      maxima: { set: Math.floor(Math.random() * 101) },
    },
  });

  // Verifica e notifica jogos quentes
  const notifiedGames = await checkAndNotifyHotGames();
  console.log(`Notificações enviadas para ${notifiedGames} jogos quentes.`);
}

simulateHotGames()
  .catch(console.error)
  .finally(() => prisma.$disconnect());