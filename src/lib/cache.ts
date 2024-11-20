import { CardData } from "@/lib/types";
import prisma from "./db";

interface CacheData {
  cards: CardData[];
  linkCasa: string;
  imageBanner: string;
  updateTime: string;
}

const cache: CacheData = {
  cards: [],
  linkCasa: "",
  imageBanner: "",
  updateTime: "",
};

// Atualiza os dados dos cards
export function updateCardsCache(cards: CardData[]) {
  cache.cards = cards;
  cache.updateTime = new Date().toISOString();
}

// Atualiza o link e o banner
export function updateSettingsCache(linkCasa: string, imageBanner: string) {
  cache.linkCasa = linkCasa;
  cache.imageBanner = imageBanner;
}

// Obtém os dados do cache
export function getCacheData(): CacheData {
  return cache;
}

// Verifica se o cache está vazio
export function isCacheEmpty(): boolean {
  return !cache.cards.length || !cache.linkCasa || !cache.imageBanner;
}


export async function populateCacheFromDB() {
  try {
    // Busca os cartões do banco
    const cards = await prisma.card.findMany({ orderBy: { id: "asc" } });

    // Busca as configurações (link e banner)
    const settings = await prisma.settings.findUnique({ where: { casa: "bruno_fp" } });

    // Atualiza o cache
    updateCardsCache(cards);
    updateSettingsCache(settings?.link || "", settings?.bannerImage || "");

    return { success: true };
  } catch (error) {
    console.error("Erro ao preencher o cache a partir do banco:");
    return { success: false };
  }
}