import Link from "next/link";

export function NavBar() {
    return (
        <nav className="shadow-sm bg-zinc-900 border-b border-zinc-500/20">
            <div className="container mx-auto flex flex-col items-center justify-center gap-5 py-3 px-4 sm:px-0 text-base lg:px-8">
                <div><h1 className="text-3xl font-bold text-zinc-200">FP SLOTS</h1></div>

                <div className="flex flex-row gap-10 text-lg w-full justify-center">
                    <Link href="/" className="hover:font-bold w-[200px] py-2 text-center border border-zinc-700 hover:bg-zinc-700 rounded-md transition-all duration-200 text-base sm:text-xl">PORCENTAGEM</Link>
                    <Link href="/sinais" className="hover:font-bold w-[200px] py-2 text-center border border-zinc-700 hover:bg-zinc-700 rounded-md transition-all duration-200 text-base sm:text-xl">GERAR SINAIS</Link>
                </div>
            </div>
        </nav>
    )
}