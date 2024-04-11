// CardGames.tsx
import React from 'react';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';

interface CardGamesProps {
    linkCasa: string
}

export function CardGames({ linkCasa }: CardGamesProps) {
    const imagesFolder = path.join(process.cwd(), 'public/image/capa-games');
    let imageFiles = fs.readdirSync(imagesFolder);

    imageFiles = imageFiles.sort((a, b) => {
        const [, indexA] = a.match(/(\d+)\.webp/) || [];
        const [, indexB] = b.match(/(\d+)\.webp/) || [];
        return parseInt(indexA, 10) - parseInt(indexB, 10);
    });
    let porcentagem = '10';
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2'>
            {imageFiles.map((fileName, index) => (
                <div key={index} className="flex flex-col my-2 justify-between">
                    <a href={linkCasa} target='_blank'>
                        <Image width={9000} height={9000} src={`/image/capa-games/${fileName}`} alt={`Card ${index}`} className=" rounded-3xl w-full h-full object-fill" />
                    </a>
                    <div className="w-[200px] h-5 rounded-full bg-zinc-50 relative z-10 mt-5 overflow-hidden">
                        <p className='font-bold text-center text-sm z-20 absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-zinc-950'>{porcentagem}%</p>
                        <div className={`bg-red-600 h-full w-[${porcentagem}%] relative`} />
                    </div>
                </div>
            ))}
        </div>
    )
}
