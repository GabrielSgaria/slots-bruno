import Image from "next/image";
import logoFP from '../../../../public/favicon.png'
import rabbit from '../../../../public/image/capa-games/1.webp'
import tiger from '../../../../public/image/capa-games/2.webp'
import mouse from '../../../../public/image/capa-games/4.webp'
import ox from '../../../../public/image/capa-games/3.webp'
import dragon from '../../../../public/image/dragao.png'

export default function Sinais() {
    return (
        <main>
            <div className="container mx-auto flex justify-center py-20 mt-20">
                <div className="flex flex-col justify-center items-center gap-2">
                    <div className="w-20 sm:w-40">
                        <Image width={9000} height={9000} src={logoFP} alt="Logo Oficial FP" />
                    </div>
                    <h1 className="text-center text-xl sm:text-2xl font-bold">GERE UM SINAL PARA CADA JOGO</h1>
                </div>
            </div>
            <div className="container mx-auto flex px-80 h-full">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <a href="/" className="w-full max-h-[140px]">
                        <Image width={9000} height={9000} src={rabbit} alt="Logo Oficial FP" className="rounded-3xl w-full h-full object-fill" />
                    </a>
                    <a href="/" className="w-full max-h-[140px]">
                        <Image width={9000} height={9000} src={tiger} alt="Logo Oficial FP" className="rounded-3xl w-full h-full object-fill" />
                    </a>
                    <a href="/" className="w-full max-h-[140px]">
                        <Image width={9000} height={9000} src={mouse} alt="Logo Oficial FP" className="rounded-3xl w-full h-full object-fill" />
                    </a>
                    <a href="/" className="w-full max-h-[140px]">
                        <Image width={9000} height={9000} src={ox} alt="Logo Oficial FP" className="rounded-3xl w-full h-full object-fill" />
                    </a>
                    <a href="/" className="w-full max-h-[140px]">
                        <Image width={9000} height={9000} src={dragon} alt="Logo Oficial FP" className="rounded-3xl w-full h-full object-fill" />
                    </a>
                </div>
            </div>
        </main>
    )
}