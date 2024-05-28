
import { FormAdm } from "@/components/form-adm";
import prisma from "@/lib/db";


export default async function PageAdmin() {
    const settings = await prisma.settings.findUnique({
        where: { id: 1 }
    })
    return (
        <div className="bg-zinc-50 h-screen w-full">
            <div className="container mx-auto flex justify-center pt-28 flex-col items-center px-2 sm:px-0 ">
                <h1 className="text-zinc-950 text-2xl uppercase">FP - SINAIS ADMIN</h1>
                <FormAdm linkAtual={settings?.link || ""}/>
            </div>
        </div>
    )
}