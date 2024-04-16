'use server'

import { getRandomPorcentagem, getRandomColor } from "./utils";
import { api } from "./api";


interface CardData {
    data: {
        id: number;
        porcentagem: number;
        cor: string;
    }[]
}


export async function createCards() {
    try {
        const cards: CardData = { data: [] };
        for (let i = 1; i <= 106; i++) {
            const porcentagem = getRandomPorcentagem();
            const cor = getRandomColor();
            cards.data.push({ id: i, porcentagem, cor });
        }
        await api.post('/cards', cards);
        return { success: true }
    } catch (error) {
        console.error('Error generating cards data:', error);
        return { success: false };
    }
}

export async function getCards(): Promise<CardData> {
    try {
        const cards = await api.get('/cards');

        if (!!cards.data[0].data.length) {
            return cards.data[0]
        }

        const resp = await createCards();
        if (resp.success) {
            const cards = await api.get('/cards');
            if (!!cards.data[0].data.length) {
                return cards.data[0]
            }
        }
        return { data: [] };
    } catch (error) {
        console.error('Error get cards data:', error);
        return { data: [] };
    }
}

