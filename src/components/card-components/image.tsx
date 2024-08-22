import { allImageCards } from "@/lib/images-cards";
import Image from "next/image";
import Link from "next/link";

interface ImageCardProps {
    id: number;
    linkCasa: string
}

export function ImageCard({ id, linkCasa }: ImageCardProps) {
    return (
        <>
            <Link href={linkCasa} target='_blank' className='hover:opacity-75 h-full transition-all duration-300 none'>
                <Image
                    width={470}
                    height={470}
                    src={allImageCards[id].image}
                    alt={`Card ${id}`}
                    className="w-full h-[150px] object-cover"
                    priority={true}
                    quality={100}
                />
                <div
                    style={{ backgroundImage: `url(${allImageCards[id].image})` }}
                    className='custom-mask'
                ></div>
            </Link>
        </>
    )
}