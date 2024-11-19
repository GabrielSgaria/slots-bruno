import { ButtonScrollTop } from "@/components/button-scroll-top";
import { ContentPp } from "@/components/content-pp";
import { CardData } from "@/components/section-cards-pg";
import { SectionCardsPP } from "@/components/section-cards-pp";
import { getCardsPP, getLinkCasa } from "@/lib/actions";
import { formatUpdateTime } from "@/lib/utils";
import Loading from "@/app/loading";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { cardsCache } from "@/lib/cache"; // Importa o cache

async function loadData() {
    let cards = cardsCache.pp || null; // Tenta buscar do cache em memória
    let linkCasa = cardsCache.linkCasa?.link || null; // Tenta buscar do cache em memória
    let updateTime = cardsCache.pp?.[0]?.updatedAt
        ? formatUpdateTime(cardsCache.pp[0].updatedAt)
        : "";

    // Caso o cache em memória não tenha os dados, busca do banco
    if (!cards || !linkCasa) {
        const cardsData = await getCardsPP();
        const propsSettings = await getLinkCasa();

        cards = cardsData?.data as CardData[];
        linkCasa = propsSettings.data?.link || null;
        updateTime = cardsData?.data[0]?.updatedAt
            ? formatUpdateTime(cardsData.data[0].updatedAt)
            : "";
    }

    return { cards, linkCasa, updateTime };
}

export default async function PpGamesPage() {
    const { cards, linkCasa, updateTime } = await loadData();

    if (!cards || !linkCasa || !updateTime) {
        return <Loading />;
    }

    return (
        <>
            <NavBar />
            <main>
                <ButtonScrollTop />
                <ContentPp />
                <SectionCardsPP cards={cards} linkCasa={linkCasa} />
            </main>
            <Footer />
        </>
    );
}
