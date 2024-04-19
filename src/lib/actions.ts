'use server'

import { getRandomPorcentagem } from "./utils";
import prisma from "./db";


interface CardData {
    data: {
        id: number;
        porcentagem: number;
    }[]
}

export async function updateCards() {
    try {
        for (let i = 1; i <= 108; i++) {
            const porcentagem = getRandomPorcentagem();
            await prisma.card.update({
                where: {
                    id: i
                },
                data: {
                    porcentagem
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
        const cards: CardData = { data: [] };
        for (let i = 1; i <= 108; i++) {
            const porcentagem = getRandomPorcentagem();

            await prisma.card.create({
                data: {
                    porcentagem
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
