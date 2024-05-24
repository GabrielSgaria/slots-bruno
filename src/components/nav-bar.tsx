import { getLinkCasa } from "@/lib/actions";
import Link from "next/link";


export async function NavBar() {
    const novoLink = await getLinkCasa();
    return (
        <div>
            <nav className="shadow-sm bg-transparent/95 border-b border-zinc-500/20 fixed top-0 w-full z-50">
                <div className="container mx-auto flex flex-col items-center justify-center gap-5 py-3 px-4 sm:px-0 text-base lg:px-8">
                    <div className="flex flex-row gap-2 sm:gap-10 text-lg w-full justify-center">
                        <Link href="/" className="px-2 py-0 text-center justify-center items-center flex text-zinc-950 font-bold rounded-md transition-all duration-200 text-base sm:text-base">
                            <p className="text-zinc-50 hover:underline">PORCENTAGEM</p>
                        </Link>
                        <Link href="/gerar-sinais" className="px-2 py-0 text-center justify-center items-center flex text-zinc-950 font-bold rounded-md transition-all duration-200 text-base sm:text-base">
                            <p className="text-zinc-50 hover:underline">GERAR SINAIS</p>
                        </Link>
                        {novoLink.data ? (
                            <Link href={novoLink?.data} target='_blank' className="italic font-bold py-2 px-3 text-center bg-green-700 hover:bg-green-600 text-yellow-400 rounded-md transition-all duration-200 text-base sm:text-base">
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
        </div>
    )
}
