'use client'
import Image from 'next/image'
import logoPp from '../../public/pp.webp'
import { CallBell } from "@phosphor-icons/react"



interface ContentPpProps {
    updateTime: string | number | undefined;
}

export function ContentPp({ updateTime }: ContentPpProps) {

    return (
        <>
             <div className="container mx-auto flex justify-center pt-28 flex-col items-center px-3 sm:px-0 gap-10 mb-10">
                <div className="flex flex-col justify-center items-center gap-2 backdrop-blur-sm bg-green-700/75 shadow-2xl shadow-black rounded-2xl py-5 px-10">

                    <div className="w-72">
                            <Image
                                src={logoPp}
                                width={1980}
                                height={1080}
                                quality={70}
                                alt='PP Games'
                            />
                        </div>
                </div>
            </div>
        </>
    )
}