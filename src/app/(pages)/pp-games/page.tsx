
import { ButtonScrollTop } from "@/components/button-scroll-top";
import { ContentPp } from "@/components/content-pp";
import { CardData } from "@/components/section-cards-pg";
import { SectionCardsPP } from "@/components/section-cards-pp";
import { getCardsPP, getLinkCasa } from "@/lib/actions";
import { formatUpdateTime } from "@/lib/utils";
import Loading from '@/app/loading';
import { NavBar } from '@/components/nav-bar';
import { Footer } from '@/components/footer';

async function loadData() {
    const cardsData = await getCardsPP();
    const propsSettings = await getLinkCasa();

    const cards = cardsData?.data as CardData[];
    const linkCasa = propsSettings.data?.link || null;
    const updateTime = cardsData?.data[0]?.updatedAt ? formatUpdateTime(cardsData.data[0].updatedAt) : '';

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
                    <ContentPp/>
                    <SectionCardsPP cards={cards} linkCasa={linkCasa} />
                </main>
            <Footer />
        </>
    );
}
