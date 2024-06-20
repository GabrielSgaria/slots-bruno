'use client'
import Image from 'next/image'
import logoFP from '../../public/favicon.png'
import { CallBell } from "@phosphor-icons/react"
import { useState } from 'react';
import { PopupImage } from './popup';

interface ContentPgProps {
    updateTime: string | number | undefined;
    imageBanner: string | null | undefined
}

export function ContentPg({ updateTime, imageBanner }: ContentPgProps) {
    const [showPopup, setShowPopup] = useState(true);

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <>
            {showPopup && <PopupImage onClose={handleClosePopup} imagePopup={imageBanner} />}
            <div className="container mx-auto flex justify-center pt-28 flex-col items-center px-3 sm:px-0 gap-10 mb-10">
                <div className="flex flex-col justify-center items-center gap-2 backdrop-blur-sm bg-green-700/75 shadow-2xl shadow-black rounded-2xl py-5 px-10">

                    <div className="w-20">
                        <Image width={9000} height={9000} src={logoFP} alt="Logo Oficial FP" />
                    </div>

                    <h1 className="text-center text-xl sm:text-2xl font-bold text-yellow-400 italic">
                        GRUPO FP OFICIAL
                    </h1>

                </div>
                <div className="py-3 shadow-2xl shadow-black text-center justify-center items-center text-base flex flex-col space-x-[3px] max-w-[600px] backdrop-blur-sm bg-zinc-950/20 border border-zinc-950/5 rounded-2xl px-2 sm:p-10">
                    <div className='flex gap-2 items-center justify-center'>
                        <CallBell className='md:size-6' weight="bold" />
                        <span className='font-bold sm:text-lg md:text-xl'>DICA:</span>
                    </div>
                    <p className='w-full text-sm'>
                        Verifique a porcentagem de pagamento dos jogos de slot para escolher os que estão com a taxa mais alta!
                        Isso pode aumentar suas chances de ganhar.
                        Não se esqueça de clicar no menu superior para acessar a página de gerar sinais e aproveitar as melhores oportunidades!

                    </p>
                </div>

                <div className="flex flex-col items-center justify-center max-w-[600px] shadow-2xl shadow-black w-full rounded-2xl p-5 bg-gradient-to-b to-green-800 via-green-600 from-green-500">
                    {updateTime && (
                        <h1 className="text-base uppercase font-bold">
                            Última atualização as {updateTime}
                        </h1>

                    )}
                    <p className='text-xs sm:text-base'>Nosso site atualiza automaticamente a cada 5 minutos</p>
                </div>
            </div>
        </>
    )
}