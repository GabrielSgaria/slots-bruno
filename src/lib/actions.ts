'use server';

import axios from "axios";
import { revalidateTag, unstable_cache } from "next/cache";
import { getPorcentagemAjustada, getRandomPorcentagem } from "./utils";
import prisma from "./db";
import { nameCards } from "./name-games";
import { Buffer } from 'buffer';
import { cardsCache } from "./cache";

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
        console.log(`Updating card ID ${i} in the database.`);
        await prisma.card.update({
            where: { id: i },
            data: { porcentagem, minima, padrao, maxima },
        });
    } else {
        console.log(`Creating card ID ${i} in the database.`);
        await prisma.card.create({
            data: {
                id: i,
                nomeJogo: nome,
                categoriaJogo: categoria,
                porcentagem,
                minima,
                padrao,
                maxima,
                colorBgGame: colorBgGame,
            },
        });
    }
}

export async function updateCards() {
    console.log("Atualizando todos os cards e cache em memória...");
    try {
        const promises = Array.from({ length: 169 }, (_, i) => {
            const gameData = nameCards[i + 1];
            if (!gameData) return Promise.resolve(null);
            return createOrUpdateCard(i + 1, gameData);
        });

        await Promise.all(promises);

        const cardsPG = await prisma.card.findMany({
            where: { categoriaJogo: "PG" },
            orderBy: { id: "asc" },
        });

        // Atualizar o cache e horário
        cardsCache.pg = cardsPG;
        console.log("Cache atualizado para os cards PG.");

        return { success: true };
    } catch (error) {
        console.error("Erro ao atualizar os cards:", error);
        return { success: false };
    }
}



export async function createCards() {
    console.log("Creating all cards...");
    try {
        for (let i = 1; i <= 169; i++) {
            const gameData = nameCards[i];
            if (!gameData) continue;

            await createOrUpdateCard(i, gameData);
        }

        revalidateTag('cards');
        console.log("Cards created successfully.");
        return { success: true };
    } catch (error) {
        console.error('Error generating cards data:', error);
        return { success: false };
    }
}

// Função para buscar os cartões da categoria 'PG'
export const getCardsPG = async () => {
    console.log("Fetching PG cards...");

    // Verificar se os dados estão no cache
    if (cardsCache.pg) {
        console.log(`Returning ${cardsCache.pg.length} PG cards from in-memory cache.`);
        return { data: cardsCache.pg };
    }

    console.log("Cache not found. Fetching PG cards from database...");
    try {
        const cards = await prisma.card.findMany({
            where: { categoriaJogo: "PG" },
            orderBy: { id: "asc" },
        });

        cardsCache.pg = cards || []; // Garantir array vazio se não houver dados
        console.log(`Fetched ${cardsCache.pg.length} PG cards from database and updated cache.`);
        return { data: cardsCache.pg };
    } catch (error) {
        console.error("Error fetching PG cards from database:", error);
        return { data: [] }; // Retornar um array vazio como fallback seguro
    }
};


// Função para buscar os cartões da categoria 'PP'
export const getCardsPP = async () => {
    console.log("Fetching PP cards...");

    // Verificar se os dados estão no cache
    if (cardsCache.pp) {
        console.log("Returning PP cards from in-memory cache.");
        return { data: cardsCache.pp };
    }

    console.log("Cache not found. Fetching PP cards from database...");
    const cards = await prisma.card.findMany({
        where: { categoriaJogo: "PP" },
        orderBy: { id: "asc" },
    });

    // Atualizar o cache
    cardsCache.pp = cards;
    console.log("Updated in-memory cache for PP cards.");
    return { data: cards };
};


// Variável única para comparação de hash

const hashUnico = process.env.HASH_LINK as string;
// Função para manipular o envio de formulários (atualização de link e imagem)
export const handleSubmit = async (e: FormData) => {
    console.log("Handling form submission...");
    const link = e.get('link') as string | null;
    const hash = e.get('hash') as string | null;
    const bannerImage = e.get('image') as File;

    if (hash !== hashUnico || !link || bannerImage.size === 0 || bannerImage.name === 'undefined') {
        console.error("Validation failed or missing data.");
        return { message: { error: 'Dados inválidos ou faltando' } };
    }

    try {
        const buffer = Buffer.from(await bannerImage.arrayBuffer());
        const base64Image = buffer.toString('base64');

        const updatedLinkCasa = await prisma.settings.upsert({
            where: { casa: 'bruno_fp' },
            update: { link, bannerImage: base64Image },
            create: { link, casa: 'bruno_fp', bannerImage: base64Image },
        });

        // Atualizar o cache com link e banner
        cardsCache.linkCasa = {
            link: updatedLinkCasa.link,
            bannerImage: updatedLinkCasa.bannerImage ?? '',
        };
        console.log("Link and banner image updated in cache:", cardsCache.linkCasa);

        return { message: { success: 'Informações atualizadas' } };
    } catch (error) {
        console.error("Error updating link:", error);
        return { message: { error: 'Erro ao atualizar o link' } };
    }
};

// Função para buscar o link e a imagem da casa
export const getLinkCasa = async () => {
    console.log("Fetching link casa...");

    // Verificar se o link e o banner já estão no cache
    if (cardsCache.linkCasa) {
        console.log("Returning link casa and banner image from in-memory cache.");
        if (typeof cardsCache.linkCasa.link !== 'string' || typeof cardsCache.linkCasa.bannerImage !== 'string') {
            console.error("Invalid data in cache, fetching from database...");
            cardsCache.linkCasa = null; // Resetar o cache inválido
        } else {
            return { data: cardsCache.linkCasa };
        }
    }

    console.log("Cache not found. Fetching link casa from database...");
    try {
        const linkCasa = await prisma.settings.findUnique({
            where: { casa: 'bruno_fp' },
        });

        if (linkCasa) {
            console.log("Link casa fetched from the database.");

            // Atualizar o cache
            cardsCache.linkCasa = {
                link: linkCasa.link ?? '',
                bannerImage: linkCasa.bannerImage ?? '',
            };

            return { data: cardsCache.linkCasa };
        }

        console.log("Link casa not found in the database.");
        return { data: null };
    } catch (error) {
        console.error("Error fetching link casa:", error);
        return { data: null };
    }
};

export async function purgeApiCache() {
    const zoneId = "d1904632fbeb9a8db0ed41324a6188aa"; // Substitua pelo ID da sua zona no Cloudflare
    const apiToken = "xEKv4DAXAKabgkJlWBqcslcpIJuZK4ibnF0FTLVl"; // Substitua pelo seu token de API do Cloudflare

    try {
        await axios.post(
            `https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`,
            {
                files: [
                    "https://grupofpsinais.com.br/api/update", // Limpa cache da API
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${apiToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("Cache dinâmico purgado com sucesso no Cloudflare.");
    } catch (error) {
        console.error("Erro ao purgar cache no Cloudflare:", error);
        throw new Error("Não foi possível purgar o cache no Cloudflare.");
    }
}