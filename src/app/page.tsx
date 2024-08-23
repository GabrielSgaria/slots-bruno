import { getCardsPG, getLinkCasa } from "@/lib/actions";
import { ContentPg } from "@/components/content-pg";
import { CardData, SectionCards } from "@/components/section-cards-pg";
import { formatUpdateTime } from "@/lib/utils";
import Loading from './loading';

async function loadData() {
  const cardsData = await getCardsPG();
  const propsSettings = await getLinkCasa();

  const cards = cardsData?.data as CardData[];
  const linkCasa = propsSettings.data?.link || null;
  const imageBanner = propsSettings.data?.bannerImage || null;
  const updateTime = cardsData?.data[0]?.updatedAt ? formatUpdateTime(cardsData.data[0].updatedAt) : '';

  return { cards, linkCasa, imageBanner, updateTime };
}

export default async function HomePage() {
  const { cards, linkCasa, imageBanner, updateTime } = await loadData();

  if (!cards || !linkCasa || !imageBanner || !updateTime) {
    return <Loading />;
  }

  return (
    <main>
      <ContentPg updateTime={updateTime} imageBanner={imageBanner} />
      <SectionCards cards={cards} linkCasa={linkCasa} />
    </main>
  );
}
