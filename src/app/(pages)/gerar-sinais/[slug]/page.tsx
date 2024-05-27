'use client'
import { gamesSinais } from "@/lib/constants"
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import tigerImage from '../../../../../public/image/bg-sinais/new-tiger.png'
import dragonImage from '../../../../../public/image/bg-sinais/new-dragon.png'
import oxImage from '../../../../../public/image/bg-sinais/new-ox.png'
import rabbitImage from '../../../../../public/image/bg-sinais/new-rabbit.png'
import mouseImage from '../../../../../public/image/bg-sinais/new-mouse.png'
import iconEntrada from '../../../../../public/image/icone-sinais/iconentrada.png'
import tBranco from '../../../../../public/image/icone-sinais/iconturboBranco.png'
import vBranco from '../../../../../public/image/icone-sinais/iconvalidadeBranco.png'
import tBege from '../../../../../public/image/icone-sinais/iconturboBege.png';
import vBege from '../../../../../public/image/icone-sinais/iconvalidadeBege.png'
import { DotFilledIcon, GearIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { generateRandomNumber, calculateEndTime } from "@/lib/utils";
import { CircleNotch } from "@phosphor-icons/react/dist/ssr";

const imageMap: Record<string, StaticImageData> = {
    "fortune-ox": oxImage,
    'fortune-rabbit': rabbitImage,
    'fortune-tiger': tigerImage,
    'fortune-mouse': mouseImage,
    'fortune-dragon': dragonImage,
}

const colorBgMap: Record<string, string> = {
    'fortune-ox': "bg-fortune-ox-color",
    'fortune-rabbit': 'bg-fortune-rabbit-color',
    'fortune-tiger': 'bg-fortune-tiger-color',
    'fortune-mouse': 'bg-fortune-mouse-color',
    'fortune-dragon': 'bg-fortune-dragon-color',
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
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [message, setMessage] = useState("");
    const [normalValue, setNormalValue] = useState("--");
    const [turboValue, setTurboValue] = useState("--");
    const [endTime, setEndTime] = useState("--");

    const handleGenerateSignal = () => {
        setButtonDisabled(true);
        setMessage("IA LENDO O CASSINO");

        setTimeout(() => {
            setButtonDisabled(true);
            setMessage("");
            setNormalValue(generateRandomNumber() + "X");
            setTurboValue(generateRandomNumber() + "X");
            setEndTime(calculateEndTime());

            let remainingSeconds = 59;

            const countdownInterval = setInterval(() => {
                remainingSeconds -= 1;
                setButtonDisabled(true);
                setMessage(`AGUARDE ${remainingSeconds}s PARA NOVO SINAL`);

                if (remainingSeconds === 0) {
                    setMessage("");
                    setButtonDisabled(false);
                    clearInterval(countdownInterval);
                }
            }, 1000);
        }, 5000);
    };

    return (
        <div className={cn("w-full h-screen flex flex-col items-center justify-center pt-5")}>
            <div className="min-h-[64.5] bg-blue-600 w-full" />
            <div className={cn("max-w-[340px] max-h-[480px] sm:max-w-[400px] sm:max-h-[590px] min-h-[400px] w-full h-full mt-20 flex flex-col justify-between rounded-2xl shadow-2xl shadow-black backdrop-blur-2xl border border-zinc-600 overflow-hidden bg-opacity-20", `${colorBgMap[game!.slug]}`)}>
                <div className="flex flex-col">

                    {/* <p className={cn("text-zinc-50 uppercase text-center font-bold border-b border-zinc-950/20 to-green-800 via-green-700 from-green-600 bg-gradient-to-b")}>
                        GERADOR DE SINAIS
                    </p> */}
                    <div className='h-full max-h-[150px] min-h-[100px] w-full'>
                        {game && imageMap[game.slug] && (
                            <Image
                                width={9000}
                                height={9000}
                                quality={100}
                                priority={true}
                                src={imageMap[game.slug]}
                                alt={game.slug}
                                className="object-center w-full h-full"
                            />
                        )}
                    </div>
                    <p className="backdrop-blur-sm text-center font-bold uppercase bg-zinc-950/30">
                        {game!.slug}
                    </p>
                </div>

                <div className="flex flex-col px-5 h-full justify-around my-2">
                    <div className={cn("px-3 w-full flex flex-row border border-zinc-950/20 rounded-lg items-center backdrop-blur-sm bg-zinc-950/20 shadow-lg shadow-black")}>
                        <div className="w-12 justify-center flex">
                            <Image
                                width={900}
                                height={900}
                                src={iconEntrada}
                                alt="Icon Entrada"
                                className="w-10/12"
                            />
                        </div>
                        <div className={cn("flex ml-5 text-lg sm:text-lg font-bold gap-4 uppercase py-3 sm:py-6 text-zinc-50")}>
                            <h1 className="text-zinc-50 w-28">NORMAL:</h1>
                            <span>{normalValue}</span>
                        </div>
                    </div>
                    <div className={cn("px-3 w-full flex flex-row border rounded-lg items-center border-zinc-950/20 backdrop-blur-sm bg-zinc-950/20 shadow-lg shadow-black", textMap[game!.slug])}>
                        <div className="w-12  justify-center flex">
                            <Image
                                width={900}
                                height={900}
                                src={tBranco}
                                // src={game && game.slug === 'fortune-rabbit' || game && game.slug === 'fortune-tiger' || game && game.slug === 'fortune-dragon' ? tBege : tBranco}
                                alt="Icon Entrada"
                                className="w-10/12"
                            />
                        </div>
                        <div className={cn("flex ml-5 text-lg sm:text-lg font-bold gap-4 uppercase py-3 sm:py-6 text-zinc-50")}>
                            <h1 className="w-28">TURBO:</h1>
                            <span>{turboValue}</span>
                        </div>
                    </div>
                    <div className={cn("px-3 w-full flex flex-row border rounded-lg items-center border-zinc-950/20 backdrop-blur-sm bg-zinc-950/20 shadow-lg shadow-black")} >
                        <div className="w-12 justify-center flex ">
                            <Image
                                width={900}
                                height={900}
                                src={vBranco}
                                // src={game && game.slug === 'fortune-rabbit' || game && game.slug === 'fortune-tiger' || game && game.slug === 'fortune-dragon' ? vBege : vBranco}
                                alt="Icon Entrada"
                                className="w-10/12"

                            />
                        </div>
                        <div className={cn("flex ml-5 text-lg sm:text-lg font-bold gap-4 uppercase py-3 sm:py-6 text-zinc-50")}>
                            <h1 className="w-28">JOGUE ATÉ:</h1>
                            <span>{endTime}</span>
                        </div>
                    </div>
                </div>
                <button
                    className={cn("w-full min-h-11 flex flex-row items-center mx-auto mt-1 backdrop-blur-sm bg-zinc-950/30 border-t border-t-zinc-950/30 transition-all")}
                    onClick={handleGenerateSignal}
                    disabled={buttonDisabled}
                >
                    <h1 className="text-center w-full text-yellow-400 font-bold text-base flex items-center gap-2 justify-center py-1">
                        {buttonDisabled ? (
                            <p className="text-zinc-50 flex gap-2 items-center">
                                {message}
                                <CircleNotch className="animate-spin size-5 text-zinc-50" />
                            </p>
                        ) : (
                            <p className="text-zinc-50 flex gap-4 items-center hover:underline">
                                GERAR SINAL<DotFilledIcon className="animate-ping size-8 text-yellow-500" />
                            </p>
                        )}
                    </h1>
                </button>
            </div>
        </div>
    )
}
