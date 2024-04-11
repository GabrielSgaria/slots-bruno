import Image from "next/image";
import logoFP from '../../../../public/favicon.png'
import rabbit from '../../../../public/image/capa-games/1.webp'
import tiger from '../../../../public/image/capa-games/2.webp'
import mouse from '../../../../public/image/capa-games/4.webp'
import ox from '../../../../public/image/capa-games/3.webp'
import dragon from '../../../../public/image/capa-games/5.webp'

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
                <a href="/" className="w-full sm:max-h-[140px]">
                    <Image width={9000} height={9000} src={rabbit} alt="Logo Oficial FP" className="rounded-3xl w-full h-full object-fill" />
                </a>
                <a href="/" className="w-full sm:max-h-[140px]">
                    <Image width={9000} height={9000} src={tiger} alt="Logo Oficial FP" className="rounded-3xl w-full h-full object-fill" />
                </a>
                <a href="/" className="w-full sm:max-h-[140px]">
                    <Image width={9000} height={9000} src={mouse} alt="Logo Oficial FP" className="rounded-3xl w-full h-full object-fill" />
                </a>
                <a href="/" className="w-full sm:max-h-[140px]">
                    <Image width={9000} height={9000} src={ox} alt="Logo Oficial FP" className="rounded-3xl w-full h-full object-fill" />
                </a>
                <a href="/" className="w-full sm:max-h-[140px]">
                    <Image width={9000} height={9000} src={dragon} alt="Logo Oficial FP" className="rounded-3xl w-full h-full object-fill" />
                </a>
            </div>

        </div>
    )
}