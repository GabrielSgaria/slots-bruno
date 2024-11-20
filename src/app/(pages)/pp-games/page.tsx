
import { ButtonScrollTop } from "@/components/button-scroll-top";
import { ContentPp } from "@/components/content-pp";
import { CardData } from "@/components/section-cards-pg";
import { SectionCardsPP } from "@/components/section-cards-pp";
import { getCardsPP, getLinkCasa } from "@/lib/actions";
import { formatUpdateTime, loadData } from "@/lib/utils";
import Loading from '@/app/loading';
import { NavBar } from '@/components/nav-bar';
import { Footer } from '@/components/footer';


export default async function PpGamesPage() {
    const data = await loadData('pp');

    if (!data || !data.cards || !data.linkCasa || !data.imageBanner || !data.updateTime) {
        return <Loading />;
    }

    const { cards, linkCasa, imageBanner, updateTime } = data;


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