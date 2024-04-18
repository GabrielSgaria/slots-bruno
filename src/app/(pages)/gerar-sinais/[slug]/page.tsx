import { gamesSinais } from "@/lib/constants"
import { cn } from "@/lib/utils";
import Image from "next/image";
import iconEntrada from '../../../../../public/image/icone-sinais/iconentrada.png'
import tBranco from '../../../../../public/image/icone-sinais/iconturboBranco.png'
import vBranco from '../../../../../public/image/icone-sinais/iconvalidadeBranco.png'
import tBege from '../../../../../public/image/icone-sinais/iconturboBege.png';
import vBege from '../../../../../public/image/icone-sinais/iconvalidadeBege.png'
import { TriangleRightIcon } from "@radix-ui/react-icons";

const backgroundMap: Record<string, string> = {
    "fortune-ox": "bg-fortune-ox",
    'fortune-rabbit': 'bg-fortune-rabbit',
    'fortune-tiger': 'bg-fortune-tiger',
    'fortune-mouse': 'bg-fortune-mouse',
    'fortune-dragon': 'bg-fortune-dragon'
}
const borderMap: Record<string, string> = {
    'fortune-ox': "border-fortune-ox-color",
    'fortune-rabbit': 'border-fortune-rabbit-color',
    'fortune-tiger': 'border-fortune-tiger-color',
    'fortune-mouse': 'border-fortune-mouse-color',
    'fortune-dragon': 'border-fortune-dragon-color',
}
const textMap: Record<string, string> = {
    "fortune-ox": "text-fortune-ox-color",
    'fortune-rabbit': 'text-fortune-rabbit-color',
    'fortune-tiger': 'text-fortune-tiger-color',
    'fortune-mouse': 'text-fortune-mouse-color',
    'fortune-dragon': 'text-fortune-dragon-color'
}


export default function PageGamesSinais({ params }: { params: { slug: string } }) {

    const game = gamesSinais.find(signal => signal.slug === params.slug);

    return (
        <div className={cn("w-full h-[640px] mt-[73px] bg-center bg-contain bg-no-repeat flex items-center justify-center", backgroundMap[game!.slug])}>
            <div className="w-[395px] h-[435px] mt-[152px] flex flex-col justify-between px-3 py-1">
                <div className={cn("p-2 w-full flex flex-row border rounded-lg items-center", borderMap[game!.slug])}>
                    <div className="w-14 items-start ">
                        <Image
                            width={900}
                            height={900}
                            src={iconEntrada}
                            alt="Icon Entrada"

                        />
                    </div>
                    <div className={cn("flex ml-5 text-2xl font-bold gap-4 uppercase py-6", textMap[game!.slug])}>
                        <h1 className="">NORMAL:</h1>
                        <span>5x</span>
                    </div>
                </div>
                <div className={cn("p-2 w-full flex flex-row border rounded-lg items-center", borderMap[game!.slug], textMap[game!.slug])}>
                    <div className="w-12 items-start ">
                        <Image
                            width={900}
                            height={900}
                            src={game && game.slug === 'fortune-rabbit' || game && game.slug === 'fortune-tiger' || game && game.slug === 'fortune-dragon' ? tBege : tBranco}
                            alt="Icon Entrada"
                            className=""
                        />
                    </div>
                    <div className={cn("flex ml-5 text-2xl font-bold gap-4 uppercase py-6", textMap[game!.slug])}>
                        <h1 className="">TURBO:</h1>
                        <span>5x</span>
                    </div>
                </div>
                <div className={cn("p-2 w-full flex flex-row border rounded-lg items-center", borderMap[game!.slug])} >
                    <div className="w-12 items-start ">
                        <Image
                            width={900}
                            height={900}
                            src={game && game.slug === 'fortune-rabbit' || game && game.slug === 'fortune-tiger' || game && game.slug === 'fortune-dragon' ? vBege : vBranco}
                            alt="Icon Entrada"

                        />
                    </div>
                    <div className={cn("flex ml-5 text-2xl font-bold gap-4 uppercase py-6", textMap[game!.slug])}>
                        <h1 className="">JOGUE ATÉ:</h1>
                        <span>10:00</span>
                    </div>
                </div>
                <div className={cn("w-9/12 flex flex-row rounded-lg items-center mx-auto mt-1 bg-green-700 hover:bg-green-600 transition-all border-2 border-yellow-500")} >
                    <h1 className="text-center w-full text-yellow-400 font-bold text-xl flex items-center gap-2 justify-center py-1">
                        GERAR SINAL
                        <TriangleRightIcon className="animate-pulse size-9 text-yellow-400" />
                    </h1>
                </div>
            </div>
        </div>
    )
}
