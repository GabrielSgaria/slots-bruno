import { getCardsPG, getLinkCasa } from "@/lib/actions";
import { ContentPg } from "@/components/content-pg";
import { CardData, SectionCards } from "@/components/section-cards-pg";
import { formatUpdateTime } from "@/lib/utils";
import Loading from './loading';

// Cache simples
let cachedData: { cards: CardData[]; linkCasa: string; imageBanner: string; updateTime: string } | null = null;

async function loadData() {
  if (cachedData) {
    return cachedData;
  }

  const cardsData = await getCardsPG();
  const propsSettings = await getLinkCasa();

  const cards = cardsData?.data as CardData[];
  const linkCasa = propsSettings.data?.link || '';
  const imageBanner = propsSettings.data?.bannerImage || '';
  const updateTime = cardsData?.data[0]?.updatedAt ? formatUpdateTime(cardsData.data[0].updatedAt) : '';

  cachedData = { cards, linkCasa, imageBanner, updateTime };
  return cachedData;
}

export default async function HomePage() {
  const data = await loadData();

  if (!data || !data.cards || !data.linkCasa || !data.imageBanner || !data.updateTime) {
    return <Loading />;
  }

  const { cards, linkCasa, imageBanner, updateTime } = data;

  return (
    <main>
      <ContentPg updateTime={updateTime} imageBanner={imageBanner} />
      <SectionCards cards={cards} linkCasa={linkCasa} />
    </main>
  );
}
