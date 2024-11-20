'use server';
import { revalidateTag, unstable_cache } from "next/cache";
import { getPorcentagemAjustada, getRandomPorcentagem } from "./utils";
import prisma from "./db";
import { nameCards } from "./name-games";
import { Buffer } from 'buffer';
import { CardData } from "./types";
import { getCacheData, updateCardsCache, updateSettingsCache } from "./cache";

const fiveMinutesInSeconds = 300;
const oneDayInSeconds = 86400;

async function createOrUpdateCard(i: number, gameData: any) {
  const { nome, categoria, colorBgGame } = gameData;
  const minima = getRandomPorcentagem();
  const padrao = getRandomPorcentagem();
  const maxima = getRandomPorcentagem();

  const maiorValor = Math.max(minima, padrao, maxima);
  let porcentagem = getPorcentagemAjustada(maiorValor);

  if (porcentagem <= maiorValor) {
    porcentagem = maiorValor + 1 <= 98 ? maiorValor + 1 : 98;
  }

  const existingCard = await prisma.card.findUnique({ where: { id: i } });

  if (existingCard) {
    await prisma.card.update({
      where: { id: i },
      data: { porcentagem, minima, padrao, maxima },
    });
  } else {
    await prisma.card.create({
      data: {
        id: i,
        nomeJogo: nome,
        categoriaJogo: categoria,
        porcentagem,
        minima,
        padrao,
        maxima,
        colorBgGame: colorBgGame
      }
    });
  }
}

export async function updateCards() {
  try {
    // Cria as promessas para atualização ou criação de cartões
    const promises = Array.from({ length: 169 }, (_, i) => {
      const id = i + 1;
      const gameData = nameCards[id];
      if (!gameData) return null;

      const { nome, categoria, colorBgGame } = gameData;
      const minima = getRandomPorcentagem();
      const padrao = getRandomPorcentagem();
      const maxima = getRandomPorcentagem();

      const maiorValor = Math.max(minima, padrao, maxima);
      let porcentagem = getPorcentagemAjustada(maiorValor);

      if (porcentagem <= maiorValor) {
        porcentagem = maiorValor + 1 <= 98 ? maiorValor + 1 : 98;
      }

      // Atualização ou criação no banco de dados
      return prisma.card.upsert({
        where: { id },
        update: { porcentagem, minima, padrao, maxima, updatedAt: new Date() },
        create: {
          id,
          nomeJogo: nome,
          categoriaJogo: categoria,
          porcentagem,
          minima,
          padrao,
          maxima,
          colorBgGame,
        },
      });
    });

    // Filtra null e executa todas as promessas
    await Promise.all(promises.filter((promise) => promise !== null));

    // Atualiza o cache com os dados atualizados
    const updatedCards = await prisma.card.findMany({ orderBy: { id: "asc" } });
    updateCardsCache(updatedCards);

    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar os cartões:", error);
    return { success: false };
  }
}


export async function createCards() {
  try {
    for (let i = 1; i <= 169; i++) {
      const gameData = nameCards[i];
      if (!gameData) continue;

      await createOrUpdateCard(i, gameData);
    }

    revalidateTag('cards');
    return { success: true };
  } catch (error) {
    console.error('Error generating cards data:', error);
    return { success: false };
  }
}


export const getCardsPG = async () => {
  const cards = await prisma.card.findMany({
    where: { categoriaJogo: "PG" },
    orderBy: { id: "asc" },
  });
  return { data: cards };
};

export const getCardsPP = async () => {
  const cards = await prisma.card.findMany({
    where: { categoriaJogo: "PP" },
    orderBy: { id: "asc" },
  });
  return { data: cards };
};


// Variável única para comparação de hash
const hashUnico = process.env.HASH_LINK as string;

// Função para manipular o envio de formulários (atualização de link e imagem)
export const handleSubmit = async (e: FormData) => {
  const link = e.get("link") as string | null;
  const hash = e.get("hash") as string | null;
  const bannerImage = e.get("image") as File;

  if (hash !== hashUnico || !link || bannerImage.size === 0 || bannerImage.name === "undefined") {
    console.log("Erro de validação ou dados faltando");
    return { message: { error: "Dados inválidos ou faltando" } };
  }

  try {
    const buffer = Buffer.from(await bannerImage.arrayBuffer());
    const base64Image = buffer.toString("base64");

    await prisma.settings.upsert({
      where: { casa: "bruno_fp" },
      update: { link, bannerImage: base64Image },
      create: { link, casa: "bruno_fp", bannerImage: base64Image },
    });

    // Atualiza o cache local
    updateSettingsCache(link, base64Image);

    return { message: { success: "Informações atualizadas" } };
  } catch (error) {
    console.error("Erro ao atualizar o link:", error);
    return { message: { error: "Erro ao atualizar o link" } };
  }
};

// Função para buscar o link e a imagem da casa

export const getLinkCasa = async () => {
  const { linkCasa, imageBanner } = getCacheData();
  return { data: { link: linkCasa, bannerImage: imageBanner } };
};
