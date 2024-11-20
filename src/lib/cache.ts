import { CardData } from "@/components/section-cards-pg";

export let cachedData: { 
    cards: CardData[]; 
    linkCasa: string; 
    imageBanner: string; 
    updateTime: string; 
    timestamp: number; // Adicionado o timestamp
} | null = null;

export let lastUpdatedAt: string | null = null;

export function setCache(data: { cards: CardData[]; linkCasa: string; imageBanner: string; updateTime: string }, updatedAt: string) {
    // Atualiza o cache apenas se o `updatedAt` mudou
    if (lastUpdatedAt !== updatedAt) {
        cachedData = { ...data, timestamp: Date.now() }; // Inclui o timestamp
        lastUpdatedAt = updatedAt;
        console.log("Cache atualizado com novos dados.");
    } else {
        console.log("Cache não foi atualizado, pois o `updatedAt` não mudou.");
    }
}


export function getCache() {
    return cachedData;
}
