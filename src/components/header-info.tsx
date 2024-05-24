'use client'
import Image from 'next/image'
import logoFP from '../../public/favicon.png'
import { CallBell } from "@phosphor-icons/react"

export function HeaderInfos() {
    return (
        <div className="container mx-auto flex justify-center pt-28 flex-col items-center">
            <div className="flex flex-col justify-center items-center gap-2 backdrop-blur-sm bg-green-700/75 shadow-2xl shadow-black rounded-2xl py-5 px-10">

                <div className="w-20">
                    <Image width={9000} height={9000} src={logoFP} alt="Logo Oficial FP" />
                </div>

                <h1 className="text-center text-xl sm:text-2xl font-bold text-yellow-400 italic">
                    GRUPO FP OFICIAL
                </h1>
            </div>
            <div className="shadow-2xl shadow-black text-center justify-center items-center text-base flex flex-col space-x-[3px] mt-10 max-w-[600px] backdrop-blur-sm bg-zinc-950/20 border border-zinc-950/5 rounded-2xl p-10">
                <div className='flex gap-2 items-center justify-center'>
                    <CallBell className='size-6' weight="bold" />
                    <span className='font-bold text-xl'>DICA:</span>
                </div>
                <p className=''>
                    Verifique a porcentagem de pagamento dos jogos de slot para escolher os que estão com a taxa mais alta!
                    Isso pode aumentar suas chances de ganhar.
                    Não se esqueça de clicar no menu superior para acessar a página de gerar sinais e aproveitar as melhores oportunidades!

                </p>
            </div>
            <div className="border-b rounded-full border-zinc-500/45 w-[300px] md:w-[400px] lg:w-[600px] my-10" />

        </div>
    )
}