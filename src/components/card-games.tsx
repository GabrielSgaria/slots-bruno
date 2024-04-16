import Image from 'next/image';
import { getCards } from '@/lib/actions';

interface CardGamesProps {
    linkCasa: string;
}
export async function CardGames({ linkCasa }: CardGamesProps) {

    const cards = await getCards();

    return (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2'>
            {cards.data.map(({ id, porcentagem, cor }) => (
                <div key={id} className="flex flex-col my-2 justify-between">
                    <a href={linkCasa} target='_blank' className='sm:hover:opacity-60 h-full'>
                        <Image width={9000} height={9000} src={`/image/capa-games/${id}.webp`} alt={`Card ${id}`} className="rounded-3xl w-full h-full object-fill" />
                    </a>
                    <div className={`w-full h-5 rounded-full bg-zinc-200 relative z-10 mt-5 overflow-hidden`} >
                        <p className='font-bold text-center text-sm z-20 absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-zinc-950'>{porcentagem}%</p>
                        <div className={`h-full imagebg`} style={{ width: `${porcentagem}%`, backgroundColor: cor, }} />
                    </div>
                </div>
            )

            )}
        </div>
    );
}
