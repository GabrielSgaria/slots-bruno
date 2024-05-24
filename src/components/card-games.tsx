'use client'
import Image from 'next/image';
import { cn, getRandomClass } from '@/lib/utils';
import { useState, useEffect } from 'react';

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
        <div key={id} className="flex flex-col my-2 justify-between">
            <a href={linkCasa} target='_blank' className='sm:hover:opacity-60 h-full'>
                <Image width={9000} height={9000} src={`/image/capa-games/${id}.webp`} alt={`Card ${id}`} className="rounded-3xl w-full h-full max-h-[169px] object-fill" />
            </a>
            <div className={`w-full h-5 rounded-full bg-zinc-300 relative z-10 mt-5 overflow-hidden border border-zinc-400`} >
                <p className='font-bold text-center text-sm z-20 absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-zinc-950'>{porcentagem}%</p>
                <div className={cn(`h-full `, currentColor)} style={{
                    width: `${porcentagem}%`,
                    backgroundImage: `linear-gradient(90deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent)`,
                    backgroundSize: `200% 100%`,
                    transition: `background-position-x 1s ease`,
                    animation: `progress-bar-stripes 4s linear infinite`,
                }} />
            </div>
        </div>
    );
}
