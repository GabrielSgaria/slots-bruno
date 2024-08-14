'use server';
import { revalidateTag, unstable_cache } from "next/cache";
import { getRandomPorcentagem } from "./utils";
import prisma from "./db";
import { nameCards } from "./name-games";
import { Buffer } from 'buffer';


const fiveMinutesInSeconds = 300;
const oneDayInSeconds = 86400;

export async function updateCards() {
    try {
        for (let i = 1; i <= 139; i++) {
            const gameData = nameCards[i];
            if (!gameData) continue;

            const { nome, categoria, colorBgGame } = gameData;
            const porcentagem = getRandomPorcentagem();
            const minima = getRandomPorcentagem();
            const padrao = getRandomPorcentagem();
            const maxima = getRandomPorcentagem();

            const existingCard = await prisma.card.findUnique({ where: { id: i } });

            if (existingCard) {
        
                await prisma.card.update({
                    where: { id: i },
                    data: {
                        porcentagem,
                        minima,
                        padrao,
                        maxima,
                    }
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
                        colorBgGame: colorBgGame,
                    }
                });
            }
        }
        revalidateTag('cards');
        revalidateTag('cards-pg')
        revalidateTag('cards-pp')
        return { success: true };
    } catch (error) {
        console.error('Error updating cards data:', error);
        return { success: false };
    }
}


export async function createCards() {
    try {
        for (let i = 1; i <= 139; i++) {
            const gameData = nameCards[i];
            if (!gameData) continue;

            const { nome, categoria, colorBgGame } = gameData;
            const porcentagem = getRandomPorcentagem();
            const minima = getRandomPorcentagem();
            const padrao = getRandomPorcentagem();
            const maxima = getRandomPorcentagem();

            await prisma.card.create({
                data: {
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
        revalidateTag('cards');
        return { success: true };
    } catch (error) {
        console.error('Error generating cards data:', error);
        return { success: false };
    }
}


export const getCardsPG = unstable_cache(async () => {
    try {
        const cards = await prisma.card.findMany({
            where: { categoriaJogo: 'PG' },
            orderBy: { id: "asc" }
        });


        if (!!cards.length) {
            return { data: cards };
        }

        const newCards = await createCards();
        if (newCards.success) {
            const cards = await prisma.card.findMany({
                where: { categoriaJogo: 'PG' },
                orderBy: {
                    id: "asc"
                }
            });
            return { data: cards };
        }
    } catch (error) {
        console.error('Error generating getCards data:', error);
        return { data: [] };
    }
}, ['cards-pg'], {
    revalidate: fiveMinutesInSeconds,
    tags: ['cards-pg']
});


export const getCardsPP = unstable_cache(async () => {
    try {
        const cards = await prisma.card.findMany({
            where: { categoriaJogo: 'PP' },
            orderBy: { id: "asc" }
        });

        if (cards.length) {
            return { data: cards };
        }

        const newCards = await createCards();
        if (newCards.success) {
            const cards = await prisma.card.findMany({
                where: { categoriaJogo: 'PP' },
                orderBy: { id: "asc" }
            });
            return { data: cards };
        }
    } catch (error) {
        console.error('Error generating getCards data:', error);
        return { data: [] };
    }
}, ['cards-pp'], {
    revalidate: fiveMinutesInSeconds,
    tags: ['cards-pp']
});


const hashUnico = process.env.HASH_LINK as string;

export const handleSubmit = async (e: FormData) => {
    const link = e.get('link') as string | null;
    const hash = e.get('hash') as string | null;
    const bannerImage = e.get('image') as File;

    if (hash === hashUnico) {
        if (!link) {
            console.log('Faltou o campo link');
            return { message: { error: 'Faltou o campo link' } };
        }

        if (bannerImage.size === 0 || bannerImage.name === 'undefined') {
            console.log('Faltou o campo imagem');
            return { message: { error: 'Faltou o campo imagem' } };
        }
    } else {
        console.log('Hash de validação incorreta ou não preenchido');
        console.log(hash);
        return { message: { error: 'Hash inválida' } };
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

        console.log('Link atualizado com sucesso:', link);
        console.log('Imagem atualizada:', bannerImage);

        return { message: { success: 'Informações atualizadas' } };
    } catch (error) {
        console.error('Erro ao atualizar o link:', error);
        return { message: { error: 'Erro ao atualizar o link' } };
    }
};

export const getLinkCasa = unstable_cache(async () => {
    try {
        const newLink = await prisma.settings.findUnique({
            where: { casa: 'bruno_fp' },
        });
        return { data: newLink };
    } catch (error) {
        console.error('Error getLinkCasa:', error);
        return { data: null };
    }
}, ['link-casa'], {
    revalidate: oneDayInSeconds,
    tags: ['link-casa']
});