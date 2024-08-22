'use client'
import { Suspense, useState, useEffect } from 'react';
import { ButtonScrollTop } from "@/components/button-scroll-top";
import { ContentPp } from "@/components/content-pp";
import { CardData } from "@/components/section-cards-pg";
import { SectionCardsPP } from "@/components/section-cards-pp";
import { getCardsPP, getLinkCasa } from "@/lib/actions";
import { formatUpdateTime } from "@/lib/utils";
import Loading from '@/app/loading'; // Assumindo que o componente de loading foi criado

function PpGamesPage() {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [cards, setCards] = useState<CardData[] | null>(null);
    const [linkCasa, setLinkCasa] = useState<string | null>(null);
    const [updateTime, setUpdateTime] = useState<string>('');

    useEffect(() => {
        async function loadData() {
            const cardsData = await getCardsPP();
            const propsSettings = await getLinkCasa();

            setCards(cardsData?.data as CardData[]);
            setLinkCasa(propsSettings.data?.link || null);
            setUpdateTime(cardsData?.data[0]?.updatedAt ? formatUpdateTime(cardsData.data[0].updatedAt) : '');

            setDataLoaded(true);
        }

        loadData();
    }, []);

    if (!dataLoaded) {
        return <Loading />;
    }

    return (
        <main>
            <ButtonScrollTop />
            <ContentPp updateTime={updateTime} />
            <SectionCardsPP cards={cards} linkCasa={linkCasa} />
        </main>
    );
}

export default function PpGames() {
    return (
        <Suspense fallback={<Loading />}>
            <PpGamesPage />
        </Suspense>
    );
}
