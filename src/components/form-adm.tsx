'use client'
import { handleSubmit } from "@/lib/actions";
import { CheckIcon, DotFilledIcon, SymbolIcon } from "@radix-ui/react-icons";
import { useState, useTransition } from "react";

type MessageForm = {
    success?: string,
    error?: string
}

export function FormAdm({ linkAtual }: { linkAtual: string }) {
    const [isPending, startTransition] = useTransition();
    const [messageForm, setMessageForm] = useState<MessageForm>({} as MessageForm);

    const handleFormSubmit = async (e: FormData) => {
        startTransition(() => { handleSubmit(e).then((res) => { setMessageForm(res.message) }) })
    };

    return (
        <form action={handleFormSubmit} className="mt-10 flex flex-col border border-zinc-300 py-20 px-10 w-full lg:w-[900px] h-[450px] rounded-2xl gap-5 items-center">
            <input
                defaultValue={linkAtual}
                name="link"
                type="text"
                placeholder="Digite o novo link..."
                className="border border-zinc-300 rounded-2xl px-3 text-zinc-950 w-full h-20 shadow-md text-xs md:text-base"
            />
            <input
                name="hash"
                type="text"
                placeholder="Digite a hash de validação..."
                className="border border-zinc-300 rounded-2xl px-3 text-zinc-950 w-full h-20 shadow-md text-xs md:text-base"
            />
            <div className="flex items-center justify-center w-full text-zinc-950 ">

                <span className="sr-only">Escolha o arquivo</span>
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                    file:text-sm file:font-semibold file:bg-violet-50 file:text-black-400 hover:file:bg-green-100 "
                />

            </div>
            <button
                type="submit"
                className={`bg-green-600 hover:shadow-xl transition-all rounded-2xl text-zinc-50 h-14 px-3 w-full shadow-md text-center flex items-center justify-center font-bold ${isPending ? 'cursor-not-allowed' : ''}`}
                disabled={isPending}
            >
                {isPending ? <SymbolIcon className="size-4 animate-spin" /> : 'ALTERAR LINK'}
            </button>
            {messageForm.success &&
                <div className="flex items-center justify-center gap-2">
                    <p className="text-green-600 text-xl uppercase font-bold">{messageForm.success}</p>
                    <CheckIcon className="text-slate-50 bg-green-600 rounded-xl size-6 font-bold text-start animate-pulse" />
                </div>
            }

            {messageForm.error &&
                <div className="flex">
                    <p className="text-red-600 text-xl uppercase font-bold">{messageForm.error}</p>
                    <DotFilledIcon className="animate-ping text-red-600 size-6 font-bold text-start" />
                </div>
            }
        </form>
    );
}