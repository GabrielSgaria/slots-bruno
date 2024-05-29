'use client'
import Image from 'next/image';
import { cn, getRandomClass } from '@/lib/utils';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MoneyWavy } from '@phosphor-icons/react';

interface CardGamesProps {
    linkCasa?: string | null;
    id: number;
    porcentagem: number;
    minima: number;
    padrao: number;
    maxima: number;
}
export function CardGames({ linkCasa, id, porcentagem, minima, padrao, maxima }: CardGamesProps) {

    const [colorMinima, setColorMinima] = useState<string>("red");
    const [colorPadrao, setColorPadrao] = useState<string>("red");
    const [colorMaxima, setColorMaxima] = useState<string>("red");

    useEffect(() => {
        setColorMinima(getRandomClass());
        setColorPadrao(getRandomClass());
        setColorMaxima(getRandomClass());
    }, []);

    if (!linkCasa) {
        return <p>Link não encontrado</p>;
    }

    return (
        <div key={id} className="flex flex-col my-4 justify-between backdrop-blur-md bg-zinc-950/20 border border-zinc-950/5 shadow-xl shadow-black px-0 pb-0 rounded-3xl max-w-[200px] overflow-hidden">
            <a href={linkCasa} target='_blank' className='sm:hover:opacity-60 h-full'>
                <Image width={9000} height={9000} src={`/image/capa-games/${id}.webp`} alt={`Card ${id}`} className="rounded-t-2xl w-full h-full min-h-[131px] max-h-[131px] object-fill" />
            </a>
            <div className='w-full h-full backdrop-blur-md py-2 px-4 flex flex-col items-start justify-start'>
                <p className='w-full text-xs justify-center text-center'>Distribuição: {porcentagem}%</p>
            </div>
            <div className='px-2 h-full w-full flex flex-col gap-1 my-5'>
                <div className='flex flex-col'>
                    <p className='text-center text-xs flex gap-2 items-center justify-center mb-1 font-semibold'>
                        Aposta Mínima:
                    </p>

                    <div className={`w-full h-3 rounded-full bg-zinc-50 relative z-10 overflow-hidden`} >
                        <p className='font-bold text-center text-xs z-20 absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-zinc-950'>{minima}%</p>
                        <div className={cn(`h-full `, colorMinima)} style={{
                            width: `${minima}%`,
                            backgroundImage: `linear-gradient(120deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent)`,
                            backgroundSize: `200% 100%`,
                            transition: `background-position-x 1s ease`,
                            animation: `progress-bar-stripes 6s linear infinite`,
                        }} />
                    </div>

                </div>
                <div className='flex flex-col'>
                    <p className='text-center text-xs flex gap-2 items-center justify-center mb-1  font-semibold'>
                        Aposta Padrão:
                    </p>
                    <div className={`w-full h-3 rounded-full bg-zinc-50 relative z-10 overflow-hidden`} >
                        <p className='font-bold text-center text-xs z-20 absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-zinc-950'>{padrao}%</p>
                        <div className={cn(`h-full `, colorPadrao)} style={{
                            width: `${padrao}%`,
                            backgroundImage: `linear-gradient(120deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent)`,
                            backgroundSize: `200% 100%`,
                            transition: `background-position-x 1s ease`,
                            animation: `progress-bar-stripes 6s linear infinite`,
                        }} />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <p className='text-center text-xs flex gap-2 items-center justify-center mb-1  font-semibold'>
                        Aposta Máxima:
                    </p>
                    <div className={`w-full h-3 rounded-full bg-zinc-50 relative z-10 overflow-hidden`} >
                        <p className='font-bold text-center text-xs z-20 absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-zinc-950'>{maxima}%</p>
                        <div className={cn(`h-full `, colorMaxima)} style={{
                            width: `${maxima}%`,
                            backgroundImage: `linear-gradient(120deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent)`,
                            backgroundSize: `200% 100%`,
                            transition: `background-position-x 1s ease`,
                            animation: `progress-bar-stripes 6s linear infinite`,
                        }} />
                    </div>
                </div>
            </div>
            <a href={linkCasa} target='_blank' className="mb-2 mx-2 hover:underline border border-zinc-50/15 text-center justify-center bg-zinc-50/10 hover:bg-zinc-50/20 items-center flex font-bold rounded-md transition-all text-base sm:text-base">
                <p className="text-zinc-50">JOGUE AGORA</p>
            </a>
            <div className="w-full h-full backdrop-blur-md pt-2 pb-4 px-2 mt-2 flex flex-col items-start justify-start">
                <p className="text-start text-xs flex gap-1 items-center justify-start">
                    <MoneyWavy />{`Mínima R$0,50 a R$2,40`}
                </p>
                <p className="text-start text-xs flex gap-1 items-center justify-start">
                    <MoneyWavy />{`Padrão R$2,50 a R$10,00`}
                </p>
                <p className="text-start text-xs flex gap-1 items-center justify-start">
                    <MoneyWavy /> {`Máxima acima de R$10,00`}
                </p>
            </div>
        </div>
    );
}
