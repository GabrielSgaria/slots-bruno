import { getCardsPG, getLinkCasa } from "@/lib/actions";
import { ContentPg } from "@/components/content-pg";
import { SectionCards } from "@/components/section-cards-pg";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { formatUpdateTime } from "@/lib/utils";

export default async function HomePage() {
    console.log("Rendering HomePage...");

    // Carregar dados do cache ou banco de dados
    const [cardsData, linkCasaData] = await Promise.all([getCardsPG(), getLinkCasa()]);

    // Verificar os dados retornados
    const cards = cardsData?.data || [];
    const linkCasa = linkCasaData?.data?.link || '';
    const imageBanner = linkCasaData?.data?.bannerImage || ''; // Adicione uma imagem padrão para evitar quebras
    const updateTime = cards?.[0]?.updatedAt
        ? formatUpdateTime(cards[0].updatedAt)
        : 'Horário indisponível';

    // Logs detalhados
    if (cards.length) {
        console.log(`Fetched ${cards.length} cards from cache or database.`);
        console.log(`First card updated at: ${cards[0]?.updatedAt}`);
    } else {
        console.warn("No cards found. Verify database or caching issues.");
    }

    if (!linkCasa) {
        console.warn("No linkCasa found. Verify database or caching issues.");
    }

    if (!imageBanner) {
        console.warn("No imageBanner found. Verify database or caching issues.");
    }

    console.log("Update Time:", updateTime);
    console.log("Link Casa:", linkCasa);
    console.log("Banner Image:", imageBanner);

    // Exibir estado de carregamento caso os dados estejam incompletos
    if (!cards.length || !linkCasa || !imageBanner) {
        console.warn("Dados incompletos. Exibindo tela de carregamento.");
        return <div>Carregando...</div>;
    }

    return (
        <>
            <NavBar />
            <main>
                <ContentPg updateTime={updateTime} imageBanner={imageBanner} />
                <SectionCards cards={cards} linkCasa={linkCasa} />
            </main>
            <Footer />
        </>
    );
}
