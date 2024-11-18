'use server';

import { revalidateTag, unstable_cache } from "next/cache";
import { getPorcentagemAjustada, getRandomPorcentagem } from "./utils";
import prisma from "./db";
import { nameCards } from "./name-games";
import { Buffer } from 'buffer';

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
    console.log('Updating all cards...');
    try {
        // Gera um array de Promises para criar/atualizar todos os cartões
        const promises = Array.from({ length: 169 }, (_, i) => {
            const gameData = nameCards[i + 1]; // Acessa o jogo pelo índice (1-based)
            if (!gameData) return Promise.resolve(null); // Retorna uma Promise resolvida se não houver dados
            return createOrUpdateCard(i + 1, gameData); // Cria ou atualiza o cartão
        });

        // Aguarda a execução paralela de todas as Promises
        await Promise.all(promises);

        // Revalida as tags de cache
        revalidateTag('cards-pg');
        revalidateTag('cards-pp');
        console.log('All cards updated and cache revalidated.');
        return { success: true };
    } catch (error) {
        console.error('Error updating cards data:', error);
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

// Função para buscar os cartões da categoria 'PG'
export const getCardsPG = unstable_cache(async () => {
    console.log('Fetching PG cards...');
    try {
        const cards = await prisma.card.findMany({
            where: { categoriaJogo: 'PG' },
            orderBy: { id: "asc" },
        });

        if (cards.length) {
            console.log('PG cards fetched from the database.');
            return { data: cards };
        }

        console.log('No PG cards found. Creating default cards...');
        await updateCards(); // Atualiza os cartões caso estejam ausentes
        const newCards = await prisma.card.findMany({
            where: { categoriaJogo: 'PG' },
            orderBy: { id: "asc" },
        });

        console.log('New PG cards created and fetched.');
        return { data: newCards };
    } catch (error) {
        console.error('Error fetching PG cards:', error);
        return { data: [] };
    }
}, ['cards-pg'], {
    revalidate: fiveMinutesInSeconds,
    tags: ['cards-pg'],
});

// Função para buscar os cartões da categoria 'PP'
export const getCardsPP = unstable_cache(async () => {
    console.log('Fetching PP cards...');
    try {
        const cards = await prisma.card.findMany({
            where: { categoriaJogo: 'PP' },
            orderBy: { id: "asc" },
        });

        if (cards.length) {
            console.log('PP cards fetched from the database.');
            return { data: cards };
        }

        console.log('No PP cards found. Creating default cards...');
        await updateCards(); // Atualiza os cartões caso estejam ausentes
        const newCards = await prisma.card.findMany({
            where: { categoriaJogo: 'PP' },
            orderBy: { id: "asc" },
        });

        console.log('New PP cards created and fetched.');
        return { data: newCards };
    } catch (error) {
        console.error('Error fetching PP cards:', error);
        return { data: [] };
    }
}, ['cards-pp'], {
    revalidate: fiveMinutesInSeconds,
    tags: ['cards-pp'],
});

// Variável única para comparação de hash

const hashUnico = process.env.HASH_LINK as string;
// Função para manipular o envio de formulários (atualização de link e imagem)
export const handleSubmit = async (e: FormData) => {
    const link = e.get('link') as string | null;
    const hash = e.get('hash') as string | null;
    const bannerImage = e.get('image') as File;
    
    if (hash !== hashUnico || !link || bannerImage.size === 0 || bannerImage.name === 'undefined') {
        console.log('Erro de validação ou dados faltando');
        return { message: { error: 'Dados inválidos ou faltando' } };
    }

    try {
        const buffer = Buffer.from(await bannerImage.arrayBuffer());
        const base64Image = buffer.toString('base64');
        
        await prisma.settings.upsert({
            where: { casa: 'bruno_fp' },
            update: { link, bannerImage: base64Image },
            create: { link, casa: 'bruno_fp', bannerImage: base64Image },
        });
        
        revalidateTag('link-casa');
        return { message: { success: 'Informações atualizadas' } };
    } catch (error) {
        console.error('Erro ao atualizar o link:', error);
        return { message: { error: 'Erro ao atualizar o link' } };
    }
};

// Função para buscar o link e a imagem da casa
export const getLinkCasa = unstable_cache(async () => {
    console.log('Fetching link casa...');
    try {
        const linkCasa = await prisma.settings.findUnique({
            where: { casa: 'bruno_fp' },
        });

        if (linkCasa) {
            console.log('Link casa fetched from the database.');
            return { data: linkCasa };
        }

        console.log('Link casa not found in the database.');
        return { data: null };
    } catch (error) {
        console.error('Error fetching link casa:', error);
        return { data: null };
    }
}, ['link-casa'], {
    revalidate: fiveMinutesInSeconds,
    tags: ['link-casa'],
});