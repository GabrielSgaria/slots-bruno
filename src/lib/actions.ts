'use server';
import { revalidateTag, unstable_cache } from "next/cache";
import { getRandomPorcentagem } from "./utils";
import prisma from "./db";

interface CardData {
    data: {
        id: number;
        porcentagem: number;
        minima: number;
        padrao: number;
        maxima: number;
    }[]
}

export async function updateCards() {
    try {
        for (let i = 1; i <= 108; i++) {
            const porcentagem = getRandomPorcentagem();
            const minima = getRandomPorcentagem();
            const padrao = getRandomPorcentagem();
            const maxima = getRandomPorcentagem();
            await prisma.card.update({
                where: {
                    id: i
                },
                data: {
                    porcentagem,
                    minima,
                    padrao,
                    maxima
                }
            })
        }
        return { success: true }
    } catch (error) {
        console.error('Error updating cards data:', error);
        return { success: false };
    }
}

export async function createCards() {
    try {
        for (let i = 1; i <= 108; i++) {
            const porcentagem = getRandomPorcentagem();
            const minima = getRandomPorcentagem();
            const padrao = getRandomPorcentagem();
            const maxima = getRandomPorcentagem();

            await prisma.card.create({
                data: {
                    porcentagem,
                    minima,
                    padrao,
                    maxima
                }
            })
        }
        return { success: true }
    } catch (error) {
        console.error('Error generating cards data:', error);
        return { success: false };
    }
}

export async function getCards() {
    try {
        const cards = await prisma.card.findMany({
            orderBy: {
                id: "asc"
            }
        })
        if (!!cards.length) {
            return { data: cards }
        }
        const newCards = await createCards()
        if (newCards.success) {
            const cards = await prisma.card.findMany({
                orderBy: {
                    id: "asc"
                }
            })
            return { data: cards }
        }
    } catch (error) {
        console.error('Error generating getCards data:', error);
        return { data: [] };
    }
}

const hashUnico = process.env.HASH_LINK as string;

export const handleSubmit = async (e: FormData) => {
    const link = e.get('link');
    const hash = e.get('hash');
    console.log({ link, hash })

    if (link && hash === hashUnico) {
        await prisma.settings.upsert({
            where: { casa: 'bruno_fp' },
            update: { link: link as string },
            create: {
                link: link as string,
                casa: 'bruno_fp'
            },
        })
        revalidateTag(`link-casa`);
        console.log('Novo link:', link);
        console.log('Link atualizado com sucesso:', link);
        return { message: { sucess: 'Link atualizado' } }
    } else {
        console.log('Hash de validação incorreta');
        console.log(hashUnico)
        return { message: { error: 'Hash inválida' } }
    }
};

export const getLinkCasa = unstable_cache(async () => {
    try {
        const newLink = await prisma.settings.findUnique({
            where: { casa: 'bruno_fp' },
        });
        return { data: newLink?.link };
    } catch (error) {
        console.error('Error getLinkCasa:', error);
        return { data: null };
    }
}, ['link-casa'], {
    tags: ['link-casa']
})
