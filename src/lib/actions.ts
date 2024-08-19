'use server';
import { revalidateTag, unstable_cache } from "next/cache";
import { getPorcentagemAjustada, getRandomPorcentagem } from "./utils";
import prisma from "./db";
import { nameCards } from "./name-games";
import { Buffer } from 'buffer';

// Definindo os tempos de revalidação em segundos
const fiveMinutesInSeconds = 300;
const oneDayInSeconds = 86400;

// Função auxiliar para criar ou atualizar um cartão
async function createOrUpdateCard(i: number, gameData: any) {
    const { nome, categoria, colorBgGame } = gameData;
    const minima = getRandomPorcentagem();
    const padrao = getRandomPorcentagem();
    const maxima = getRandomPorcentagem();

    // Calculando a porcentagem de forma direta sem while
    const maiorValor = Math.max(minima, padrao, maxima);
    let porcentagem = getPorcentagemAjustada(maiorValor);

    // Se a porcentagem calculada for menor ou igual ao maior valor, ajustamos diretamente
    if (porcentagem <= maiorValor) {
        porcentagem = maiorValor + 10 <= 95 ? maiorValor + 10 : 95;
    }

    const existingCard = await prisma.card.findUnique({ where: { id: i } });

    if (existingCard) {
        await prisma.card.update({
            where: { id: i },
            data: { porcentagem, minima, padrao, maxima },
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
                colorBgGame: colorBgGame
            }
        });
    }
}

// Função para atualizar os cartões existentes
export async function updateCards() {
    try {
        for (let i = 1; i <= 139; i++) {
            const gameData = nameCards[i];
            if (!gameData) continue;

            await createOrUpdateCard(i, gameData);
        }
        // Revalidando os caches
        revalidateTag('cards');
        revalidateTag('cards-pg');
        revalidateTag('cards-pp');
        return { success: true };
    } catch (error) {
        console.error('Error updating cards data:', error);
        return { success: false };
    }
}

// Função para criar novos cartões
export async function createCards() {
    try {
        for (let i = 1; i <= 139; i++) {
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
    try {
        const cards = await prisma.card.findMany({
            where: { categoriaJogo: 'PG' },
            orderBy: { id: "asc" }
        });

        if (cards.length) {
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
        return { data: [] }; // Garanta que sempre retorna um array vazio se não houver dados
    } catch (error) {
        console.error('Error generating getCardsPG data:', error);
        return { data: [] };
    }
}, ['cards-pg'], {
    revalidate: fiveMinutesInSeconds,
    tags: ['cards-pg']
});

// Função para buscar os cartões da categoria 'PP'
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
        return { data: [] }; // Garanta que sempre retorna um array vazio se não houver dados
    } catch (error) {
        console.error('Error generating getCardsPP data:', error);
        return { data: [] };
    }
}, ['cards-pp'], {
    revalidate: fiveMinutesInSeconds,
    tags: ['cards-pp']
});

// Função para manipular o envio de formulários (atualização de link e imagem)
const hashUnico = process.env.HASH_LINK as string;

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


// export async function updateCards() {
//     try {
//         for (let i = 1; i <= 139; i++) {
//             const gameData = nameCards[i];
//             if (!gameData) continue;

//             const { nome, categoria, colorBgGame } = gameData;
//             const minima = getRandomPorcentagem();
//             const padrao = getRandomPorcentagem();
//             const maxima = getRandomPorcentagem();


//             const maiorValor = Math.max(minima, padrao, maxima);
            
//             const porcentagem = getPorcentagemAjustada(maiorValor);

//             const existingCard = await prisma.card.findUnique({ where: { id: i } });

//             if (existingCard) {
        
//                 await prisma.card.update({
//                     where: { id: i },
//                     data: {
//                         porcentagem,
//                         minima,
//                         padrao,
//                         maxima,
//                     }
//                 });
//             } else {
//                 await prisma.card.create({
//                     data: {
//                         id: i,
//                         nomeJogo: nome,
//                         categoriaJogo: categoria,
//                         porcentagem,
//                         minima,
//                         padrao,
//                         maxima,
//                         colorBgGame: colorBgGame,
//                     }
//                 });
//             }
//         }
//         revalidateTag('cards');
//         revalidateTag('cards-pg')
//         revalidateTag('cards-pp')
//         return { success: true };
//     } catch (error) {
//         console.error('Error updating cards data:', error);
//         return { success: false };
//     }
// }


// export async function createCards() {
//     try {
//         for (let i = 1; i <= 139; i++) {
//             const gameData = nameCards[i];
//             if (!gameData) continue;

//             const { nome, categoria, colorBgGame } = gameData;
//             const minima = getRandomPorcentagem();
//             const padrao = getRandomPorcentagem();
//             const maxima = getRandomPorcentagem();

//             const maiorValor = Math.max(minima, padrao, maxima);
            
//             const porcentagem = getPorcentagemAjustada(maiorValor);

//             await prisma.card.create({
//                 data: {
//                     nomeJogo: nome,
//                     categoriaJogo: categoria,
//                     porcentagem,
//                     minima,
//                     padrao,
//                     maxima,
//                     colorBgGame: colorBgGame
//                 }
//             });
//         }
//         revalidateTag('cards');
//         return { success: true };
//     } catch (error) {
//         console.error('Error generating cards data:', error);
//         return { success: false };
//     }
// }


// export const getCardsPG = unstable_cache(async () => {
//     try {
//         const cards = await prisma.card.findMany({
//             where: { categoriaJogo: 'PG' },
//             orderBy: { id: "asc" }
//         });


//         if (!!cards.length) {
//             return { data: cards };
//         }

//         const newCards = await createCards();
//         if (newCards.success) {
//             const cards = await prisma.card.findMany({
//                 where: { categoriaJogo: 'PG' },
//                 orderBy: {
//                     id: "asc"
//                 }
//             });
//             return { data: cards };
//         }
//     } catch (error) {
//         console.error('Error generating getCards data:', error);
//         return { data: [] };
//     }
// }, ['cards-pg'], {
//     revalidate: fiveMinutesInSeconds,
//     tags: ['cards-pg']
// });


// export const getCardsPP = unstable_cache(async () => {
//     try {
//         const cards = await prisma.card.findMany({
//             where: { categoriaJogo: 'PP' },
//             orderBy: { id: "asc" }
//         });

//         if (cards.length) {
//             return { data: cards };
//         }

//         const newCards = await createCards();
//         if (newCards.success) {
//             const cards = await prisma.card.findMany({
//                 where: { categoriaJogo: 'PP' },
//                 orderBy: { id: "asc" }
//             });
//             return { data: cards };
//         }
//     } catch (error) {
//         console.error('Error generating getCards data:', error);
//         return { data: [] };
//     }
// }, ['cards-pp'], {
//     revalidate: fiveMinutesInSeconds,
//     tags: ['cards-pp']
// });


// const hashUnico = process.env.HASH_LINK as string;

// export const handleSubmit = async (e: FormData) => {
//     const link = e.get('link') as string | null;
//     const hash = e.get('hash') as string | null;
//     const bannerImage = e.get('image') as File;

//     if (hash === hashUnico) {
//         if (!link) {
//             console.log('Faltou o campo link');
//             return { message: { error: 'Faltou o campo link' } };
//         }

//         if (bannerImage.size === 0 || bannerImage.name === 'undefined') {
//             console.log('Faltou o campo imagem');
//             return { message: { error: 'Faltou o campo imagem' } };
//         }
//     } else {
//         console.log('Hash de validação incorreta ou não preenchido');
//         console.log(hash);
//         return { message: { error: 'Hash inválida' } };
//     }

//     try {
//         const buffer = Buffer.from(await bannerImage.arrayBuffer());
//         const base64Image = buffer.toString('base64');

//         await prisma.settings.upsert({
//             where: { casa: 'bruno_fp' },
//             update: { link, bannerImage: base64Image },
//             create: { link, casa: 'bruno_fp', bannerImage: base64Image },
//         });

//         revalidateTag('link-casa');

//         console.log('Link atualizado com sucesso:', link);
//         console.log('Imagem atualizada:', bannerImage);

//         return { message: { success: 'Informações atualizadas' } };
//     } catch (error) {
//         console.error('Erro ao atualizar o link:', error);
//         return { message: { error: 'Erro ao atualizar o link' } };
//     }
// };

// export const getLinkCasa = unstable_cache(async () => {
//     try {
//         const newLink = await prisma.settings.findUnique({
//             where: { casa: 'bruno_fp' },
//         });
//         return { data: newLink };
//     } catch (error) {
//         console.error('Error getLinkCasa:', error);
//         return { data: null };
//     }
// }, ['link-casa'], {
//     revalidate: oneDayInSeconds,
//     tags: ['link-casa']
// });