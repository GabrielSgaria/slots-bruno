import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Fire } from '@phosphor-icons/react';
import { allImageCards } from '@/lib/images-cards';
import Link from 'next/link';
import { ImageCard } from './card-components/image';

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
    const getColor = (value: number) => {
        if (value >= 70) return 'bg-green-500';
        if (value >= 40) return 'bg-yellow-500';
        else return 'bg-red-600';
    }

    const isHot = nomeJogo.toLowerCase().startsWith('fortune') && (minima > 90 || padrao > 90 || maxima > 90) && categoriaJogo === "PG";
    const isPlayGame = (categoriaJogo === 'PP' ||
        !nomeJogo.toLowerCase().startsWith('fortune') && categoriaJogo === 'PG') && (minima > 90 || padrao > 90 || maxima > 90);


    if (!linkCasa) {
        return <p>Link não encontrado</p>;
    }

    return (

        <div key={id} className='game rounded-xl flex flex-col my-4 justify-between shadow-xl shadow-black max-w-[215px] sm:max-w-[175px] w-full sm:min-w-[157px] overflow-hidden relative' style={{ backgroundColor: `${colorBgGame}` }}>
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
                        priority={true}
                        quality={100}
                    />
                    <span className='overflow-hidden font-[1rem] leading-none'>{nomeJogo}</span>
                </div>
                <div className='flex flex-col text-center items-center justify-center gap-1 text-xs sm:text-[15px] h-full'>
                    <p className='w-full px-3'>Padrão: {padrao}%
                        <div className={cn('loadingBar w-full h-3 bg-gray-300 rounded-xl')}>
                            <div className={cn(`loadingBarInner ${getColor(padrao)}`)} style={{ width: padrao }}>
                            </div>
                        </div>
                    </p>
                    <p className='w-full px-3'>Mínima: {minima}%
                        <div className={cn('loadingBar w-full h-3 bg-gray-300 rounded-xl')}>
                            <div className={cn(`loadingBarInner ${getColor(minima)}`)} style={{ width: minima }}>
                            </div>
                        </div>
                    </p>
                    <p className='w-full px-3'>Máxima: {maxima}%
                        <div className={cn('loadingBar w-full h-3 bg-gray-300 rounded-xl')}>
                            <div className={cn(`loadingBarInner ${getColor(maxima)}`)} style={{ width: maxima }}>
                            </div>
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
                    </div>)}

            </div>
        </div >

    )
}




{/* <div key={id} className="flex flex-col my-4 justify-between backdrop-blur-md bg-zinc-950/20 border border-zinc-950/5 shadow-xl shadow-black px-0 pb-0 rounded-xl max-w-[215px] sm:max-w-[175px] w-full sm:min-w-[157px] overflow-hidden"> */ }
//     {isHot && (
//         <div className="absolute top-1 right-1 z-20 w-[70px] h-7 rounded-md flex items-center justify-center bg-red-600 animate-pulse">
//             <p className='text-zinc-50 text-md font-bold'>HOT</p>
//             <Fire weight="fill" className="text-red-50 text-xl animate-pulse" />
//         </div>
//     )}
//     <a href={linkCasa} target='_blank' className='sm:hover:opacity-60 h-full'>
//         <Image
//             width={370}
//             height={370}
//             src={allImageCards[id]}
//             alt={`Card ${id}`}
//             className="object-cover min-h-[140px] max-h-[150px] bg-zinc-950"
//             // loading="lazy"
//             priority={true}
//             quality={100}
//         // placeholder="blur"
//         // blurDataURL={allImageCards[id]}
//         />
//     </a>
//     <div className={cn(`flex flex-col justify-between`)} style={{ backgroundImage: `url(${allImageCards[id]})`, opacity: 0.8 }}>
//         <div className='w-full h-full flex flex-col bg-indigo-600/30 backdrop-blur-xl '>
//             <div className='w-full max-h-[32px] h-full backdrop-blur-md py-2 px-4 flex flex-col items-start justify-start'>
//                 <p className='w-full text-xs justify-center text-center'>Distribuição {porcentagem}%</p>
//             </div>
//             <div className='px-2 h-full w-full flex flex-col gap-1 my-5'>
//                 {[
//                     { label: 'Aposta Mínima', value: minima, color: getColor(minima) },
//                     { label: 'Aposta Padrão', value: padrao, color: getColor(padrao) },
//                     { label: 'Aposta Máxima', value: maxima, color: getColor(maxima) },
//                 ].map(({ label, value, color }) => (
//                     <div key={label} className='flex flex-col'>
//                         <p className='text-center text-xs flex gap-2 items-center justify-center mb-1 font-semibold'>{label}:</p>
//                         <div className={`w-full h-3 rounded-full bg-zinc-50 relative z-10 overflow-hidden`}>
//                             <p className='font-bold text-center text-xs z-20 absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-zinc-950'>{value}%</p>
//                             <div
//                                 className={cn(`h-full`, color)}
//                                 style={{
//                                     width: `${value}%`,
//                                     backgroundImage: `linear-gradient(120deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent)`,
//                                     backgroundSize: `200% 100%`,
//                                     transition: `background-position-x 1s ease`,
//                                     animation: `progress-bar-stripes 6s linear infinite`,
//                                 }}
//                             />
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <a href={linkCasa} target='_blank' className="mb-2 mx-2 hover:underline border border-zinc-50/15 text-center justify-center bg-zinc-50/10 hover:bg-zinc-50/20 items-center flex font-bold rounded-md transition-all text-base sm:text-base">
//                 <p className="text-zinc-50">JOGUE AGORA</p>
//             </a>
//             <div className="w-full h-full backdrop-blur-md pt-2 pb-1 px-2 mt-2 flex flex-col items-center justify-center text-nowrap">
//                 {[
//                     { label: 'Mínima R$0,50 a R$2,40' },
//                     { label: 'Padrão R$2,50 a R$10,00' },
//                     { label: 'Máxima acima de R$10,00' },
//                 ].map(({ label }) => (
//                     <p key={label} className="text-start text-xs flex gap-1 items-center justify-start">
//                         <MoneyWavy /> {label}
//                     </p>
//                 ))}
//             </div>
//             {isHot && (
//                 <div className="w-full items-center flex justify-center py-2 px-1">
//                     <Link
//                         href={`/gerar-sinais/${nomeJogo}`}
//                         className="bg-red-700 text-zinc-50 font-bold py-3 px-1 rounded-xl hover:bg-red-700 w-full text-center text-nowrap text-sm sm:text-base animate-pulse">
//                         Estratégia detectada
//                     </Link>
//                 </div>
//             )}
//         </div>
//     </div>
// </div >