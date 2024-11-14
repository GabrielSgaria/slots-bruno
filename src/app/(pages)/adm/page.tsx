
import { FormAdm } from "@/components/form-adm";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";


export default async function PageAdmin() {
    const settings = await prisma.settings.findUnique({
        where: { id: 1 }
    })
    return (
        <div className="bg-zinc-50 h-screen w-full">
            <div className="container mx-auto flex justify-center pt-28 flex-col items-center px-2 sm:px-0 ">
                <div className="mb-4">
                    <Button
                        variant="outline"
                        size="sm"
                        asChild
                    >
                        <Link href="/" className='text-black'>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Voltar para o site
                        </Link>
                    </Button>
                </div>
                <h1 className="text-zinc-950 text-2xl uppercase">FP - SINAIS ADMIN</h1>
                <FormAdm linkAtual={settings?.link || ""} />
            </div>
        </div>
    )
}