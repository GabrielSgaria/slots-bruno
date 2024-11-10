import { getCardsPG, getLinkCasa } from "@/lib/actions";
import { ContentPg } from "@/components/content-pg";
import { CardData, SectionCards } from "@/components/section-cards-pg";
import { formatUpdateTime } from "@/lib/utils";
import Loading from './loading';
import { unstable_cache } from "next/cache";

const fiveMinutesInSeconds = 300;

const loadData = unstable_cache(async () => {
  const cardsData = await getCardsPG();
  const propsSettings = await getLinkCasa();

  const cards = cardsData?.data as CardData[];
  const linkCasa = propsSettings.data?.link || '';
  const imageBanner = propsSettings.data?.bannerImage || '';
  const updateTime = cardsData?.data[0]?.updatedAt ? formatUpdateTime(cardsData.data[0].updatedAt) : '';

  return { cards, linkCasa, imageBanner, updateTime };
}, ['cards-pg'], {
  revalidate: fiveMinutesInSeconds,
  tags: ['cards-pg']
});

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
