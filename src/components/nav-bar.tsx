import { getLinkCasa } from "@/lib/actions";
import Link from "next/link";


export async function NavBar() {
    const getLink = await getLinkCasa();
    const novoLink = getLink.data?.link

    return (
     
            <nav className="shadow-sm shadow-black bg-transparent/95 border-b border-zinc-500/20 fixed top-0 w-full z-50">
                <div className="container mx-auto flex flex-col items-center justify-center gap-5 py-3 px-2">
                    <div className="flex flex-row gap-2 sm:gap-10 text-lg w-full justify-center items-center">
                        <Link href="/" className=" py-0 text-center justify-center items-center flex text-zinc-950 font-bold rounded-md transition-all duration-200  sm:text-base">
                            <p className="text-zinc-50 hover:underline text-xs sm:text-sm">JOGOS PG</p>
                        </Link>
                        <div className="h-10 border-r border-zinc-50/20"/>
                        <Link href="/pp-games" className="py-0 text-center justify-center items-center flex text-zinc-950 font-bold rounded-md transition-all duration-200  sm:text-base">
                            <p className="text-zinc-50 hover:underline text-xs sm:text-sm">JOGOS PP</p>
                        </Link>
                        
                        <div className="h-10 border-r border-zinc-50/20"/>
                        <Link href="/gerar-sinais" className="py-0 text-center justify-center items-center flex text-zinc-950 font-bold rounded-md transition-all duration-200  sm:text-base">
                            <p className="text-zinc-50 hover:underline text-xs sm:text-sm">GERAR SINAIS</p>
                        </Link>
                        <div className="h-10 border-r border-zinc-50/20"/>
                        {novoLink ? (
                            <Link href={novoLink} target='_blank' className="h-full text-xs sm:text-sm italic font-bold py-2 px-2 text-center bg-green-700 hover:bg-green-600 text-yellow-400 rounded-md transition-all duration-200">
                                JOGUE AGORA
                            </Link>
                        ) :
                            <Link href='/' target='_blank' className="font-bold w-[200px] py-2 text-center border bg-green-600  text-yellow-400 border-zinc-700 hover:bg-zinc-700 rounded-md transition-all duration-200 text-base sm:text-xl">
                                LINK NÃO ENCONTRADO
                            </Link>
                        }
                    </div>
                </div>
            </nav>
  
    )
}
