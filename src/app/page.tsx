'use client'
import { Suspense, useState, useEffect } from 'react';
import { getCardsPG, getLinkCasa } from "@/lib/actions";
import { ContentPg } from "@/components/content-pg";
import { CardData, SectionCards } from "@/components/section-cards-pg";
import { formatUpdateTime } from "@/lib/utils";
import Loading from './loading';

function HomePage() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [cards, setCards] = useState<CardData[] | null>(null);
  const [linkCasa, setLinkCasa] = useState<string | null>(null);
  const [imageBanner, setImageBanner] = useState<string | null>(null);
  const [updateTime, setUpdateTime] = useState<string>('');

  useEffect(() => {
    async function loadData() {
      const cardsData = await getCardsPG();
      const propsSettings = await getLinkCasa();
      
      setCards(cardsData?.data as CardData[]);
      setLinkCasa(propsSettings.data?.link || null);
      setImageBanner(propsSettings.data?.bannerImage || null);
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
      <ContentPg updateTime={updateTime} imageBanner={imageBanner} />
      <SectionCards cards={cards} linkCasa={linkCasa} />
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <HomePage />
    </Suspense>
  );
}
