'use client'
import Image from 'next/image'
import logoFP from '../../public/favicon.png'
import { CallBell } from "@phosphor-icons/react"


interface ContentPpProps {
    updateTime: string | number | undefined;
}

export function ContentPp({ updateTime }: ContentPpProps) {

    return (
        <>
            <div className="container mx-auto flex justify-center pt-28 flex-col items-center px-3 sm:px-0 gap-5 mb-10">
                {/* <div className="flex flex-col justify-center items-center gap-2 backdrop-blur-sm bg-green-700/75 shadow-2xl shadow-black rounded-2xl py-5 px-10">

                    <div className="w-20">
                        <Image width={9000} height={9000} src={logoFP} alt="Logo Oficial FP" />
                    </div>

                    <h1 className="text-center text-xl sm:text-2xl font-bold text-yellow-400 italic ">
                        GRUPO FP OFICIAL
                    </h1>

                </div> */}
                <div className='flex flex-col '>
                    {/* <div className='w-[350px] bg-black  pt-5 px-10 rounded-t-xl'>
                        <p className='font-bold text-zinc-50'>
                            ANALISE OS PRINCIPAIS JOGOS PP NAS PLATAFORMAS DO GRUPO FP
                        </p>
                    </div> */}

                    <div className='w-[350px] rounded-2xl overflow-hidden'>
                        <Image
                            src='https://sa-east-1.graphassets.com/clxhh2irf0i1g0ekkf9ad5xah/clxm8ktkm0a3807lw9qdzjbcr'
                            width={1980}
                            height={1080}
                            quality={70}
                            alt='PP Games'
                            className='object-cover w-full'
                        />
                    </div>
                </div>

                {/* <div className="flex flex-col items-center justify-center max-w-[600px] shadow-2xl shadow-black w-full rounded-2xl p-5 bg-gradient-to-b to-green-800 via-green-600 from-green-500">
                    {updateTime && (
                        <h1 className="text-base uppercase font-bold">
                            Última atualização as {updateTime}
                        </h1>

                    )}
                    <p className='text-xs sm:text-base'>Nosso site atualiza automaticamente a cada 5 minutos</p>
                </div> */}
            </div>
        </>
    )
}