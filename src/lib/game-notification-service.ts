import { PrismaClient } from '@prisma/client';
import { sendNotification } from './notification-service';

const prisma = new PrismaClient();

export async function checkAndNotifyHotGames() {
  const hotGames = await prisma.card.findMany({
    where: {
      OR: [
        { minima: { gte: 90 } },
        { padrao: { gte: 90 } },
        { maxima: { gte: 90 } },
      ],
    },
  });

  for (const game of hotGames) {
    const maxValue = Math.max(game.minima, game.padrao, game.maxima);
    await sendNotification(
      '🔥 Jogo HOT!',
      `${game.nomeJogo} está com ${maxValue}% de retorno! Aproveite agora!`,
      'hot'
    );
  }

  return hotGames.length;
}