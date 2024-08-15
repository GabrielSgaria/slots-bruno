import { getCardsPG, getLinkCasa } from "@/lib/actions";
import { ContentPg } from "@/components/content-pg";
import { CardData, SectionCards } from "@/components/section-cards-pg";
import { formatUpdateTime } from "@/lib/utils";

export default async function Home() {
  const cards = await getCardsPG();
  const propsSettings = await getLinkCasa();
  const novoLink = propsSettings.data?.link;
  const imageBanner = propsSettings.data?.bannerImage;

  const formattedDate = cards?.data[0]?.updatedAt ? formatUpdateTime(cards.data[0].updatedAt) : '';

  return (
    <main>
      <ContentPg updateTime={formattedDate} imageBanner={imageBanner} />
      <SectionCards cards={cards?.data as CardData[]} linkCasa={novoLink} />
    </main>
  );
}
