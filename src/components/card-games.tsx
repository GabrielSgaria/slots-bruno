'use client'
import Image from 'next/image';
import { cn, getRandomClass } from '@/lib/utils';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CardGamesProps {
    linkCasa?: string | null;
    id: number;
    porcentagem: number;
}
export function CardGames({ linkCasa, id, porcentagem }: CardGamesProps) {

    const [currentColor, setCurrentColor] = useState<string>("red");

    useEffect(() => {
        const color = getRandomClass();
        setCurrentColor(color);
    }, []);

    if (!linkCasa) {
        return <p>Link não encontrado</p>;
    }

    return (
        <div key={id} className="flex flex-col gap-5  my-2 justify-between backdrop-blur-sm bg-zinc-950/20 border border-zinc-950/5 shadow-xl shadow-black px-2 py-3 rounded-3xl max-w-[247px]">
            <a href={linkCasa} target='_blank' className='sm:hover:opacity-60 h-full'>
                <Image width={9000} height={9000} src={`/image/capa-games/${id}.webp`} alt={`Card ${id}`} className="rounded-3xl w-full h-full max-h-[131px] object-fill" />
            </a>
            <div className={`w-full h-5 rounded-full bg-zinc-50 relative z-10 overflow-hidden`} >
                <p className='font-bold text-center text-xs z-20 absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-zinc-950'>{porcentagem}%</p>
                <div className={cn(`h-full `, currentColor)} style={{
                    width: `${porcentagem}%`,
                    backgroundImage: `linear-gradient(120deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent)`,
                    backgroundSize: `200% 100%`,
                    transition: `background-position-x 1s ease`,
                    animation: `progress-bar-stripes 6s linear infinite`,
                }} />
            </div>
            <Link href="/gerar-sinais" className="border border-zinc-50/15 text-center justify-center items-center flex font-bold rounded-md transition-all duration-200 text-base sm:text-base">
                <p className="text-zinc-50 hover:underline">GERAR SINAIS</p>
            </Link>
        </div>
    );
}
