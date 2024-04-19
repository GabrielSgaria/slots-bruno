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
        for (let i = 1; i <= 106; i++) {
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
        console.log('foi')
        return { success: true }
    } catch (error) {
        console.error('Error updating cards data:', error);
        return { success: false };
    }
}

export async function createCards() {
    try {
        const cards: CardData = { data: [] };
        for (let i = 1; i <= 106; i++) {
            const porcentagem = getRandomPorcentagem();
            // cards.data.push({ id: i, porcentagem });
            await prisma.card.create({
                data: {
                    porcentagem
                }
            })
        }
        // await api.post('/api/cards', cards);

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


// export async function getCards(): Promise<CardData> {
//     try {
//         const cards = await api.get('/cards');
//         if (!!cards.data[0].data.length) {
//             return cards.data[0]
//         }

//         const resp = await createCards();
//         if (resp.success) {
//             const cards = await api.get('/cards');
//             if (!!cards.data[0].data.length) {
//                 return cards.data[0]
//             }
//         }
//         return { data: [] };
//     } catch (error) {
//         console.error('Error get cards data:', error);
//         return { data: [] };
//     }
// }


