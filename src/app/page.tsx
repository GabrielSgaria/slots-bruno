
import { ButtonScrollTop } from "@/components/button-scroll-top";
import { getCardsPG, getLinkCasa } from "@/lib/actions";
import { ContentPg } from "@/components/content-pg";
import { revalidateTag } from "next/cache";
import { format, toZonedTime } from "date-fns-tz";
import { CardData, SectionCards } from "@/components/section-cards-pg";
import { Analytics } from "@vercel/analytics/next";


export default async function Home() {
  const cards = await getCardsPG();
  const propsSettings = await getLinkCasa();
  const novoLink = propsSettings.data?.link
  const imageBanner = propsSettings.data?.bannerImage
  console.log('cards:', cards);
  console.log('cards?.data:', cards?.data);
  console.log('cards?.data[0]:', cards?.data[0]);
  console.log('cards?.data[0]?.updatedAt:', cards?.data[0]?.updatedAt);

  let horario = cards?.data[0].updatedAt || ''
  const date = new Date(horario);
  
  const timeZone = 'America/Sao_Paulo'
  const zonedDate = toZonedTime(date, timeZone)
  const formattedDate = format(zonedDate, 'HH:mm', { timeZone })

  revalidateTag('timeCron')
  return (
    <main>
      <Analytics />
      <ButtonScrollTop />
      <ContentPg updateTime={formattedDate} imageBanner={imageBanner} />
      <SectionCards cards={cards?.data as CardData[]} linkCasa={novoLink} />
    </main>
  );
}
