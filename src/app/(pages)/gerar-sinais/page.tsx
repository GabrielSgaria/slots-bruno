import Image from "next/image";
import logoFP from '../../../../public/favicon.png'
import { gamesSinais } from "@/lib/constants";

export default function GerarSinais() {
    return (
        <div className="h-screen w-full">
            <div className="container mx-auto flex justify-center pt-28 flex-col items-center">
                <div className="flex flex-col justify-center items-center gap-2">
                    <div className="w-20">
                        <Image width={9000} height={9000} src={logoFP} alt="Logo Oficial FP" />
                    </div>
                    <h1 className="text-center text-xl sm:text-2xl font-bold">
                        GERE UM SINAL PARA CADA JOGO
                    </h1>
                </div>
                <div className="border-b rounded-full border-zinc-500/45 w-[300px] md:w-[400px] lg:w-[600px] my-10" />
            </div>

            <div className="grid grid-cols-2 px-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 lg:px-64 gap-6 container mx-auto ">
                {gamesSinais.map(({ image, slug }) => (
                    <div key={slug}>
                        <a href={`/gerar-sinais/${slug}`} className="w-full sm:max-h-[140px]">
                            <Image width={9000} height={9000} src={image} alt={slug} className="rounded-3xl w-full h-full object-fill" />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}
