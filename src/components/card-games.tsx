import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface CardGamesProps {
    linkCasa: string;
}

interface CardData {
    id: number;
    porcentagem: number;
    cor: string;
}

const getRandomPorcentagem = () => Math.floor(Math.random() * (100 - 2 + 1)) + 2; 

const getRandomColor = () => {
    const colors = ['#3f6212', '#65a30d', '#0d9488', '#ffff00', '#7e22ce', '#db2777'];
    return colors[Math.floor(Math.random() * colors.length)];
};

const getStoredPorcentagem = (id: number) => {
    const storedPorcentagem = localStorage.getItem(`porcentagem-${id}`);
    return storedPorcentagem ? parseInt(storedPorcentagem) : null;
};

export function CardGames({ linkCasa }: CardGamesProps) {
    const [cardsData, setCardsData] = useState<CardData[]>([]);

    const generateCardsData = () => {
        const newCardsData: CardData[] = [];
        for (let i = 1; i <= 105; i++) {
            const storedPorcentagem = getStoredPorcentagem(i);
            const porcentagem = storedPorcentagem !== null ? storedPorcentagem : getRandomPorcentagem();
            const cor = getRandomColor();
            newCardsData.push({ id: i, porcentagem, cor });
            localStorage.setItem(`porcentagem-${i}`, porcentagem.toString()); 
        }
        setCardsData(newCardsData);
    };


    useEffect(() => {
        generateCardsData();
        const intervalId = setInterval(generateCardsData, 60 * 60 * 1000);
        return () => clearInterval(intervalId); 
    }, []);

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2'>
            {cardsData.map(({ id, porcentagem, cor }) => (
                <div key={id} className="flex flex-col my-2 justify-between">
                    <a href={linkCasa} target='_blank'>
                        <Image width={9000} height={9000} src={`/image/capa-games/${id}.webp`} alt={`Card ${id}`} className="rounded-3xl w-full h-full object-fill" />
                    </a>
                    <div className={`w-[200px] h-5 rounded-full bg-zinc-50 relative z-10 mt-5 overflow-hidden`} >
                        <p className='font-bold text-center text-sm z-20 absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-zinc-950'>{porcentagem}%</p>
                        <div className={`h-full imagebg`} style={{ width: `${porcentagem}%`, backgroundColor: cor, }} />
                    </div>
                </div>
            ))}
        </div>
    )
}
