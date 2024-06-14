
import { ButtonScrollTop } from "@/components/button-scroll-top";
import { getCards, getLinkCasa } from "@/lib/actions";
import { HeaderInfos } from "@/components/header-info";
import { revalidateTag } from "next/cache";
import {format, toZonedTime } from "date-fns-tz";
import { CardData, SectionCards } from "@/components/section-cards";


export default async function Home() {
  const [cards, novoLink] = await Promise.all([getCards(), getLinkCasa()]);
  let horario = cards?.data[0].updatedAt || ''
  const date = new Date(horario);
  const timeZone = 'America/Sao_Paulo'
  const zonedDate = toZonedTime(date, timeZone)
  const formattedDate = format(zonedDate, 'HH:mm', {timeZone})
  
  revalidateTag('timeCron')
  return (
    <main>
      <ButtonScrollTop />
      <HeaderInfos updateTime={formattedDate} />
      <SectionCards cards={cards?.data as CardData[]} linkCasa={novoLink?.data}/>
    </main>
  );
}
