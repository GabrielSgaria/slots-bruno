import { getCardsPG, getLinkCasa } from "@/lib/actions";
import { ContentPg } from "@/components/content-pg";
import { SectionCards } from "@/components/section-cards-pg";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { formatUpdateTime } from "@/lib/utils";

export default async function HomePage() {
    const cardsData = await getCardsPG();
    const linkCasaData = await getLinkCasa();

    // Processa os dados
    const cards = cardsData?.data || [];
    const linkCasa = linkCasaData?.data?.link || "";
    const imageBanner = linkCasaData?.data?.bannerImage || "";
    const updateTime = cards.length > 0
        ? formatUpdateTime(cards[0].updatedAt)
        : "Horário indisponível";

    // Renderiza a página
    if (!cards.length || !linkCasa || !imageBanner || !updateTime) {
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
