import { ButtonScrollTop } from "@/components/button-scroll-top";
import { ContentPp } from "@/components/content-pp";
import { CardData } from "@/components/section-cards-pg";
import { SectionCardsPP } from "@/components/section-cards-pp";
import { getCardsPP, getLinkCasa } from "@/lib/actions";
import { format, toZonedTime } from "date-fns-tz";
import { revalidateTag } from "next/cache";


export default async function PpGames() {
    const cards = await getCardsPP();
    const propsSettings = await getLinkCasa();
    const novoLink = propsSettings.data?.link

    let horario = cards?.data[0].updatedAt || ''

    const date = new Date(horario);

    date.setTime(date.getTime() + 5 * 60 * 1000);

    const timeZone = 'America/Sao_Paulo'
    const zonedDate = toZonedTime(date, timeZone)
    const formattedDate = format(zonedDate, 'HH:mm', { timeZone })

    revalidateTag('timeCron')
    return (
        <main>
            <ButtonScrollTop />
            <ContentPp updateTime={formattedDate} />
            <SectionCardsPP cards={cards?.data as CardData[]} linkCasa={novoLink} />
        </main>
    )
} 