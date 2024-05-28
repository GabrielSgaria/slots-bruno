import Image from "next/image";
import logoFP from '../../../../public/favicon.png'
import { gamesSinais } from "@/lib/constants";
import Link from "next/link";

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
                    <div key={slug} className="overflow-hidden flex flex-col my-4 justify-between backdrop-blur-md bg-zinc-950/20 shadow-xl shadow-black rounded-3xl w-full max-w-[230px]">
                        <a href={`/gerar-sinais/${slug}`} className='sm:hover:opacity-60 h-full min-h-[158px]'>
                            <Image width={9000} height={9000} src={image} alt={slug} className="rounded-t-3xl w-full h-full object-fill" />
                        </a>
                        <p className="text-zinc-50 uppercase text-center font-bold backdrop-blur-sm">{`${slug}`}</p>
                        <div className='px-2 h-full w-full flex flex-col gap-4 mt-5'>
                            <Link href={`/gerar-sinais/${slug}`} className="my-2 border border-zinc-50/15 text-center justify-center hover:bg-zinc-50/15 items-center flex font-bold rounded-md transition-all duration-200 text-base sm:text-base">
                                <p className="text-zinc-50 hover:underline uppercase">Gerar sinal</p>
                            </Link>
                        </div>
                        <div className="w-full h-full backdrop-blur-md py-2 mt-4">
                            <p className="text-center text-xs px-2 ">
                                {`Os sinais do ${slug} são validos apenas para nossas casas!`}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
