import Image from "next/image";
import logoFP from '../../../../public/favicon.png'
import { gamesSinais } from "@/lib/constants";
import Link from "next/link";
import { allImageCards } from "@/lib/images-cards";
import { cn } from "@/lib/utils";

export default function GerarSinais() {
    return (
        <div>
            <div className="container mx-auto flex justify-center pt-28 flex-col items-center px-3 mb-10">
                <div className="flex flex-col justify-center items-center gap-2 backdrop-blur-sm bg-green-700/75 shadow-2xl shadow-black rounded-2xl py-5 px-10">

                    <div className="w-20">
                        <Image width={9000} height={9000} src={logoFP} alt="Logo Oficial FP" />
                    </div>

                    <h1 className="text-center text-xl sm:text-2xl font-bold text-yellow-400 uppercase">
                        Gere um sinal para cada jogo
                    </h1>
                </div>
            </div>

            <div className="grid grid-cols-2 px-2  sm:grid-cols-3 sm:px-10 md:grid-cols-3 lg:grid-cols-5 lg: gap-2 container mx-auto justify-items-center">

                {gamesSinais.map(({ image, slug }) => (
                    <div key={slug} className="game rounded-xl flex flex-col my-1 justify-between shadow-xl shadow-black max-w-[215px] sm:max-w-[240px] w-full sm:min-w-[157px] overflow-hidden relative">
                        <Link href={`/gerar-sinais/${slug}`} target='_blank' className='hover:opacity-75 h-full transition-all duration-300 none'>
                            <Image
                                width={470}
                                height={470}
                                src={image}
                                alt={slug}
                                className="w-full h-[150px] object-cover"
                                priority={true}
                                quality={100}
                            />
                            <div
                                style={{ backgroundImage: `url(${image})` }}
                                className='custom-mask'
                            ></div>
                        </Link>
                        <div className='gameContent relative z-20 -top-1 pt-[10px] flex flex-col min-h-[100px] justify-between'>
                            <div className='flex px-3 items-center justify-center gap-3'>
                                <span className=' font-[12px] leading-none uppercase'>{slug}</span>
                            </div>
                        </div>
                    </div>

                ))}

            </div>
        </div >
    )
}
