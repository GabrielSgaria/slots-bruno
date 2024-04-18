import { gamesSinais } from "@/lib/constants"
import { cn } from "@/lib/utils";
import iconEntrada from '../../../../../public/image/icone-sinais/iconentrada.png'
import iconTurbo from '../../../../../public/image/icone-sinais/iconturbo.png'
import iconValidade from '../../../../../public/image/icone-sinais/iconvalidade.png'
import Image from "next/image";

const backgroundMap: Record<string, string> = {
    "fortune-ox": "bg-fortune-ox",
    'fortune-rabbit': 'bg-fortune-rabbit',
    'fortune-tiger': 'bg-fortune-tiger',
    'fortune-mouse': 'bg-fortune-mouse',
    'fortune-dragon': 'bg-fortune-dragon'
}


export default function PageGamesSinais({ params }: { params: { slug: string } }) {


    const game = gamesSinais.find(signal => signal.slug === params.slug);

    return (
        <div className={cn("w-full h-[640px] mt-[73px] bg-center bg-contain bg-no-repeat flex items-center justify-center", backgroundMap[game!.slug])}>
            <div className="w-[395px] h-[375px] mt-[82px] flex flex-col justify-between px-3 py-1 border-zinc-50 border">
                <div className="p-2 w-full flex flex-row border-[#9d2525] border rounded-lg items-center ">
                    <div className="w-14 items-start ">
                        <Image
                            width={900}
                            height={900}
                            src={iconEntrada}
                            alt="Icon Entrada"
                            className=""
                        />
                    </div>
                    <div className="flex ml-5 text-[#9d2525] text-2xl font-bold gap-4 uppercase py-6">
                        <h1 className="">NORMAL:</h1>
                        <span>5x</span>
                    </div>
                </div>
                <div className="p-2 w-full flex flex-row border-[#9d2525] border rounded-lg items-center ">
                    <div className="w-14 items-start ">
                        <Image
                            width={900}
                            height={900}
                            src={iconTurbo}
                            alt="Icon Entrada"
                            className=""
                        />
                    </div>
                    <div className="flex ml-5 text-[#9d2525] text-2xl font-bold gap-4 uppercase py-6">
                        <h1 className="">TURBO:</h1>
                        <span>5x</span>
                    </div>
                </div>
                <div className="p-2 w-full flex flex-row border-[#9d2525] border rounded-lg items-center ">
                    <div className="w-14 items-start ">
                        <Image
                            width={900}
                            height={900}
                            src={iconValidade}
                            alt="Icon Entrada"
                            className=""
                        />
                    </div>
                    <div className="flex ml-5 text-[#9d2525] text-2xl font-bold gap-4 uppercase py-6">
                        <h1 className="">JOGUE ATÉ:</h1>
                        <span>10:00</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
