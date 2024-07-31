import { ButtonScrollTop } from "@/components/button-scroll-top";
import { ContentPp } from "@/components/content-pp";
import { CardData } from "@/components/section-cards-pg";
import { SectionCardsPP } from "@/components/section-cards-pp";
import { getCardsPP, getLinkCasa } from "@/lib/actions";
import { format, toZonedTime } from "date-fns-tz";
import { revalidateTag } from "next/cache";
import logoFp from '../../../../public/favicon.png'
import Image from "next/image";


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

            <div className="h-screen w-full flex items-center justify-center bg-green-950 flex-col gap-10">
                <h1 className="font-bold text-2xl text-yellow-500">PÁGINA EM MANUTENÇÃO</h1>
                <div className="w-24 flex items-center justify-center relative ">
                    <div className="bg-green-900 p-2 rounded-xl animate-ping absolute w-20 h-20 z-10" />
                    <Image src={logoFp} alt="Logo FP" width={900} height={900} quality={100} className="z-20" />
                </div>
            </div>



            {/* <ButtonScrollTop />
            <ContentPp updateTime={formattedDate} />
            <SectionCardsPP cards={cards?.data as CardData[]} linkCasa={novoLink} /> */}
        </main>
    )
} 