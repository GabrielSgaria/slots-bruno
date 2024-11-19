import { getCardsPG, getLinkCasa } from "@/lib/actions";
import { ContentPg } from "@/components/content-pg";
import { SectionCards } from "@/components/section-cards-pg";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { formatUpdateTime } from "@/lib/utils";

export default async function HomePage() {
    console.log("Rendering HomePage...");

    const [cardsData, linkCasaData] = await Promise.all([getCardsPG(), getLinkCasa()]);

    const cards = cardsData?.data || [];
    const linkCasa = linkCasaData?.data?.link || "";
    const imageBanner = linkCasaData?.data?.bannerImage || "";
    const updateTime = cards.length > 0
        ? formatUpdateTime(cards[0].updatedAt)
        : "Horário indisponível";

    console.log("Update Time:", updateTime);
    console.log("Link Casa:", linkCasa);
    console.log("Banner Image:", imageBanner);

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