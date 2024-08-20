'use client';
import { useState } from "react";
import { gamesSinais } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { CircleNotch } from "@phosphor-icons/react/dist/ssr";
import iconEntrada from '../../../../../public/image/icone-sinais/iconentrada.png';
import tBranco from '../../../../../public/image/icone-sinais/iconturboBranco.png';
import vBranco from '../../../../../public/image/icone-sinais/iconvalidadeBranco.png';
import { generateRandomNumber, calculateEndTime } from "@/lib/utils";

const imageMap: Record<string, string> = {
    "fortune-ox": '/image/games-pg/03.webp',
    'fortune-rabbit': '/image/games-pg/01.webp',
    'fortune-tiger': '/image/games-pg/02.webp',
    'fortune-mouse': '/image/games-pg/04.webp',
    'fortune-dragon': '/image/games-pg/05.webp',
};

const colorBgMap: Record<string, string> = {
    'fortune-ox': "bg-fortune-ox-color",
    'fortune-rabbit': 'bg-fortune-rabbit-color',
    'fortune-tiger': 'bg-fortune-tiger-color',
    'fortune-mouse': 'bg-fortune-mouse-color',
    'fortune-dragon': 'bg-fortune-dragon-color',
};

const textMap: Record<string, string> = {
    "fortune-ox": "text-fortune-ox-color",
    'fortune-rabbit': 'text-fortune-rabbit-color',
    'fortune-tiger': 'text-fortune-tiger-color',
    'fortune-mouse': 'text-fortune-mouse-color',
    'fortune-dragon': 'text-fortune-dragon-color',
};

export default function PageGamesSinais({ params }: { params: { slug: string } }) {
    const gameName = params.slug ? params.slug.toString().replace(/%20/g, '-').toLowerCase() : '';
    const game = gamesSinais.find(signal => signal.slug === gameName);

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [message, setMessage] = useState("");
    const [normalValue, setNormalValue] = useState<string | JSX.Element>("--");
    const [turboValue, setTurboValue] = useState<string | JSX.Element>("--");
    const [endTime, setEndTime] = useState<string | JSX.Element>("--");

    const handleGenerateSignal = () => {
        setButtonDisabled(true);
        setMessage("IA LENDO O CASSINO");

        // Mostrar ícone de loading nos campos
        setNormalValue(<CircleNotch className="animate-spin size-5 text-zinc-50" />);
        setTurboValue(<CircleNotch className="animate-spin size-5 text-zinc-50" />);
        setEndTime(<CircleNotch className="animate-spin size-5 text-zinc-50" />);

        setTimeout(() => {
            setMessage("");
            setNormalValue(generateRandomNumber() + "X");
            setTurboValue(generateRandomNumber() + "X");
            setEndTime(calculateEndTime());

            let remainingSeconds = 59;

            const countdownInterval = setInterval(() => {
                remainingSeconds -= 1;
                setMessage(`AGUARDE ${remainingSeconds}s PARA NOVO SINAL`);

                if (remainingSeconds === 0) {
                    setMessage("");
                    setButtonDisabled(false);
                    clearInterval(countdownInterval);
                }
            }, 1000);
        }, 5000);
    };

    if (!game) {
        return <p className="text-center text-red-500">Jogo não encontrado</p>;
    }

    return (
        <div className={cn("w-full flex flex-col items-center justify-center")}>
            <div className="min-h-[55px] sm:min-h-[65px] w-full" />
            <div className="flex h-[90vh] items-center justify-center p-3">
                <div className={cn("max-w-[400px] sm:max-w-[450px] min-w-[400px] game rounded-xl flex flex-col my-1 justify-between shadow-xl shadow-black w-full relative overflow-hidden", `${colorBgMap[gameName]}`)}>
                    <div className="flex flex-col">
                        <div className='h-full max-h-[150px] min-h-[100px] w-full'>
                            <Image
                                width={450}
                                height={200}
                                quality={100}
                                priority={true}
                                src={imageMap[game.slug]}
                                alt={game.slug}
                                className="w-full h-[150px] object-cover"
                            />
                            <div
                                style={{ backgroundImage: `url(${imageMap[game.slug]})` }}
                                className='custom-mask'
                            ></div>
                        </div>
                        <div className='gameContent relative z-20 -top-1 flex flex-col min-h-[120px] justify-between backdrop-blur-sm '>
                            <div className='flex px-3 items-center justify-center gap-3 backdrop-blur-sm bg-zinc-950/30 h-[32px]'>
                                <span className=' text-sm leading-none uppercase py-1'>{gameName}</span>
                            </div>
                            <div className="px-3 py-6 flex flex-col text-center items-center justify-center gap-4 text-xs sm:text-[15px] h-full">
                                <div className={cn("backdrop-blur-md bg-zinc-50/10 border border-zinc-950/10 px-3 py-1 w-full flex flex-row rounded-lg items-center shadow-inner shadow-black/90")}>
                                    <div className="w-12 justify-center flex">
                                        <Image
                                            width={900}
                                            height={900}
                                            src={iconEntrada}
                                            alt="Icon Entrada"
                                            className="w-9/12"
                                        />
                                    </div>
                                    <div className={cn("flex ml-5 text-lg sm:text-lg font-bold gap-4 uppercase py-3 sm:py-6 text-zinc-50")}>
                                        <h1 className="text-zinc-50 w-28">NORMAL:</h1>
                                        <span>{normalValue}</span>
                                    </div>
                                </div>
                                <div className={cn("backdrop-blur-md bg-zinc-50/10 border border-zinc-950/10 px-3 py-1 w-full flex flex-row rounded-lg items-center shadow-inner shadow-black/90", textMap[gameName])}>
                                    <div className="w-12 justify-center flex">
                                        <Image
                                            width={900}
                                            height={900}
                                            src={tBranco}
                                            alt="Icon Entrada"
                                            className="w-9/12"
                                        />
                                    </div>
                                    <div className={cn("flex ml-5 text-lg sm:text-lg font-bold gap-4 uppercase py-3 sm:py-6 text-zinc-50")}>
                                        <h1 className="w-28">TURBO:</h1>
                                        <span>{turboValue}</span>
                                    </div>
                                </div>
                                <div className={cn("backdrop-blur-md bg-zinc-50/10 border border-zinc-950/10 px-3 py-1 w-full flex flex-row rounded-lg items-center shadow-inner shadow-black/90")} >
                                    <div className="w-12 justify-center flex ">
                                        <Image
                                            width={900}
                                            height={900}
                                            src={vBranco}
                                            alt="Icon Entrada"
                                            className="w-9/12"
                                        />
                                    </div>
                                    <div className={cn("flex ml-5 text-lg sm:text-lg font-bold gap-4 uppercase py-3 sm:py-6 text-zinc-50")}>
                                        <h1 className="w-28">JOGUE ATÉ:</h1>
                                        <span>{endTime}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            className={cn("z-20 w-full min-h-11 flex flex-row items-center mx-auto mt-1 backdrop-blur-sm bg-zinc-950/30 border-t border-t-zinc-950/30 transition-all")}
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
                                    <p className="text-zinc-50 flex gap-4 items-center hover:underline z-20">
                                        GERAR SINAL<DotFilledIcon className="animate-ping size-6 text-green-500" />
                                    </p>
                                )}
                            </h1>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
