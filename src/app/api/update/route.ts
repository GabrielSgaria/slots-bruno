import { getCardsPG, getLinkCasa, updateCards } from "@/lib/actions";
import { formatUpdateTime } from "@/lib/utils";
import { NextResponse } from "next/server";

// Variáveis de cache em memória para controlar a expiração e atualização
let cachedData: { cards: any[]; linkCasa: string; imageBanner: string; updateTime: string } | null = null;
let cacheTimestamp: number = 0;

// Função para atualizar os dados dos cartões
export async function GET() {
    try {
        // Executa a função de atualização
        const updateCard = await updateCards();

        // Limpa o cache manualmente, para forçar a atualização dos dados na próxima solicitação
        cachedData = null;
        cacheTimestamp = 0;

        // Responde com sucesso após a atualização
        return NextResponse.json({ success: true, message: "Dados atualizados e cache invalidado" });
    } catch (error) {
        console.error("Erro ao atualizar os dados dos cartões:", error);
        return new NextResponse("Erro no servidor", { status: 500 });
    }
}

export async function loadData() {
    const now = Date.now();
    const CACHE_EXPIRATION_TIME = 300000; // 5 minutos em milissegundos

    // Verifica se o cache está válido
    if (cachedData && (now - cacheTimestamp) < CACHE_EXPIRATION_TIME) {
        return cachedData;
    }

    // Se o cache expirou, recarrega os dados
    const cardsData = await getCardsPG();
    const propsSettings = await getLinkCasa();

    const cards = cardsData?.data as any[];
    const linkCasa = propsSettings.data?.link || '';
    const imageBanner = propsSettings.data?.bannerImage || '';
    const updateTime = cardsData?.data[0]?.updatedAt ? formatUpdateTime(cardsData.data[0].updatedAt) : '';

    // Atualiza o cache e o timestamp
    cachedData = { cards, linkCasa, imageBanner, updateTime };
    cacheTimestamp = now;

    return cachedData;
}



// import { updateCards } from "@/lib/actions";
// import { revalidateTag } from "next/cache";
// import { NextResponse } from "next/server";


// export async function GET() {
//     try {
//         const updateCard = await updateCards();
//         revalidateTag('cards-pg')
//         revalidateTag('cards-pp')
//         return NextResponse.json(updateCard);
//     } catch (error) {
//         console.error(error);
//         return new NextResponse("Server error", { status: 500 });
//     }
// }
