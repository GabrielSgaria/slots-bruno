import { ButtonScrollTop } from "@/components/button-scroll-top";
import { ContentPp } from "@/components/content-pp";
import { CardData } from "@/components/section-cards-pg";
import { SectionCardsPP } from "@/components/section-cards-pp";
import { getCardsPP, getLinkCasa } from "@/lib/actions";
import { formatUpdateTime } from "@/lib/utils";
import Loading from '@/components/loading';
import { NavBar } from '@/components/nav-bar';
import { Footer } from '@/components/footer';

// Função para carregar e formatar os dados
async function loadData() {
    try {
        // Executa as operações de busca em paralelo
        const [cardsData, propsSettings] = await Promise.all([
            getCardsPP(),
            getLinkCasa(),
        ]);

        const cards = cardsData?.data as CardData[] || [];
        const linkCasa = propsSettings.data?.link || null;
        const updateTime = cards.length > 0 && cards[0].updatedAt 
            ? formatUpdateTime(new Date(cards[0].updatedAt)) // Converte para Date
            : '';

        // Valida os dados essenciais antes de retornar
        if (!cards.length || !linkCasa || !updateTime) {
            throw new Error("Dados incompletos ou inválidos");
        }

        return { cards, linkCasa, updateTime };
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
        return null; // Retorna null para indicar falha
    }
}

export default async function PpGamesPage() {
    const data = await loadData();

    // Tratamento de falhas no carregamento
    if (!data) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500">Erro ao carregar os dados. Por favor, tente novamente mais tarde.</p>
            </div>
        );
    }

    const { cards, linkCasa, updateTime } = data;

    return (
        <>
            <NavBar />
            <main>
                <ButtonScrollTop />
                <ContentPp />
                <SectionCardsPP cards={cards} linkCasa={linkCasa} />
                <p className="text-center mt-4 text-sm text-gray-500">
                    Última atualização: {updateTime}
                </p>
            </main>
            <Footer />
        </>
    );
}
