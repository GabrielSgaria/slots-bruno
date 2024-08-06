import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Fire } from '@phosphor-icons/react';
import { allImageCards } from '@/lib/images-cards';
import Link from 'next/link';
import { ImageCard } from './card-components/image';
import { useMemo } from 'react';

interface CardGamesProps {
    linkCasa?: string | null;
    id: number;
    porcentagem: number;
    minima: number;
    padrao: number;
    maxima: number;
    nomeJogo: string;
    categoriaJogo: string;
    colorBgGame: string;
}

export function CardGames({ linkCasa, id, porcentagem, minima, padrao, maxima, nomeJogo, categoriaJogo, colorBgGame }: CardGamesProps) {
    const getColor = useMemo(() => (value: number) => {
        if (value >= 70) return 'bg-green-500';
        if (value >= 40) return 'bg-yellow-500';
        return 'bg-red-600';
    }, []);

    const isHot = useMemo(() => nomeJogo.toLowerCase().startsWith('fortune') && (minima > 90 || padrao > 90 || maxima > 90) && categoriaJogo === "PG", [nomeJogo, minima, padrao, maxima, categoriaJogo]);
    
    const isPlayGame = useMemo(() => (categoriaJogo === 'PP' ||
        !nomeJogo.toLowerCase().startsWith('fortune') && categoriaJogo === 'PG') && (minima > 90 || padrao > 90 || maxima > 90), [categoriaJogo, nomeJogo, minima, padrao, maxima]);

    if (!linkCasa) {
        return <p>Link não encontrado</p>;
    }

    return (
        <div key={id} className='game rounded-xl flex flex-col my-1 justify-between shadow-xl shadow-black max-w-[215px] sm:max-w-[175px] w-full sm:min-w-[157px] overflow-hidden relative' style={{ backgroundColor: colorBgGame }}>
            {isHot && (
                <div className="absolute top-[2px] right-[2px] z-20 w-[60px] h-6 rounded-md flex items-center justify-center bg-green-600 animate-pulse">
                    <p className='text-zinc-50 text-base font-medium'>HOT</p>
                    <Fire weight="fill" className="text-red-50 text-xl animate-pulse" />
                </div>
            )}
            {isPlayGame && (
                <div className="absolute top-[2px] right-[2px] z-20 px-3 h-6 rounded-md flex items-center justify-center bg-green-600 animate-pulse">
                    <p className='text-zinc-50 text-base font-medium'>+90%</p>
                    <Fire weight="fill" className="text-red-50 text-xl animate-pulse" />
                </div>
            )}
            <ImageCard id={id} linkCasa={linkCasa} />
            <div className='gameContent relative z-20 -top-1 pt-[10px] flex flex-col min-h-[260px] justify-between'>
                <div className='flex px-3 items-center justify-center gap-3'>
                    <Image
                        width={150}
                        height={150}
                        src={allImageCards[id].icon}
                        alt={`Card ${id}`}
                        className="w-[55px] min-w-[55px] max-w-[55px] h-[50px] min-h-[50px] max-h-[50px] rounded-xl"
                        priority
                        quality={100}
                    />
                    <span className='overflow-hidden font-[1rem] leading-none'>{nomeJogo}</span>
                </div>
                <div className='flex flex-col text-center items-center justify-center gap-1 text-xs sm:text-[15px] h-full'>
                    <p className='w-full px-3'>Padrão: {padrao}%
                        <div className={cn('loadingBar w-full h-3 bg-gray-300 rounded-xl')}>
                            <div className={cn(`loadingBarInner ${getColor(padrao)}`)} style={{ width: `${padrao}%` }}></div>
                        </div>
                    </p>
                    <p className='w-full px-3'>Mínima: {minima}%
                        <div className={cn('loadingBar w-full h-3 bg-gray-300 rounded-xl')}>
                            <div className={cn(`loadingBarInner ${getColor(minima)}`)} style={{ width: `${minima}%` }}></div>
                        </div>
                    </p>
                    <p className='w-full px-3'>Máxima: {maxima}%
                        <div className={cn('loadingBar w-full h-3 bg-gray-300 rounded-xl')}>
                            <div className={cn(`loadingBarInner ${getColor(maxima)}`)} style={{ width: `${maxima}%` }}></div>
                        </div>
                    </p>
                </div>
                <span className='distribution'>Distribuição: {porcentagem}%</span>

                {isHot ? (
                    <div className="w-[90%] h-full flex mx-auto pt-3 items-center justify-center">
                        <Link
                            href={`/gerar-sinais/${nomeJogo}`}
                            className="rounded-xl bg-green-600 text-zinc-50 font-bold py-3 px-1 hover:bg-green-500 w-full text-center text-nowrap text-sm sm:text-sm animate-pulse">
                            Estratégia detectada
                        </Link>
                    </div>
                ) : isPlayGame ? (
                    <div className="w-[90%] h-full flex mx-auto pt-3 items-center justify-center">
                        <Link href={linkCasa} target='_blank' className="rounded-xl bg-green-600 text-zinc-50 font-bold py-3 px-1 hover:bg-green-500 w-full text-center text-nowrap text-sm sm:text-sm animate-pulse">
                            <p className="text-zinc-50">JOGUE AGORA</p>
                        </Link>
                    </div>
                ) : (
                    <div className='w-full h-full px-1 py-3 '>
                        <div className='font-medium w-full h-full bg-black/20 px-2 py-2 text-xs flex flex-col justify-center items-center gap-2 rounded-xl'>
                            <span>Mínima R$0,50 a R$2,40 </span>
                            <span>Padrão R$2,50 a R$10,00</span>
                            <span>Máxima acima de R$10,00</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}