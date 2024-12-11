import { CardData } from "@/components/section-cards-pg";

export interface CachedData {
  cards: CardData[];
  linkCasa: string;
  imageBanner: string;
  updateTime: string;
  timestamp: number;
}

let cache: CachedData | null = null;

export async function initializeCache(): Promise<void> {
  if (!cache) {
    // Initialize with empty data
    cache = {
      cards: [],
      linkCasa: '',
      imageBanner: '',
      updateTime: new Date().toISOString(),
      timestamp: Date.now(),
    };
  }
}

export async function getCache(): Promise<CachedData | null> {
  await initializeCache();
  return cache;
}

export async function setCache(data: Omit<CachedData, 'timestamp'>): Promise<void> {
  cache = { ...data, timestamp: Date.now() };
}

export async function isCacheValid(): Promise<boolean> {
  const currentCache = await getCache();
  if (!currentCache) return false;
  
  const cacheAge = Date.now() - currentCache.timestamp;
  const maxAge = 5 * 60 * 1000; // 5 minutes
  return cacheAge < maxAge;
}

