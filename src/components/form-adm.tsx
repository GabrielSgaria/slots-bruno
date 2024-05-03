'use client'
import { handleSubmit } from "@/lib/actions";
import { SymbolIcon } from "@radix-ui/react-icons";
import { useState, useTransition } from "react";

type MessageForm = {
    sucess?: string,
    error?: string
}

export function FormAdm({ linkAtual }: { linkAtual: string }) {
    const [isPending, startTransition] = useTransition();
    const [messageForm, setMessageForm] = useState<MessageForm>({} as MessageForm);

    const handleFormSubmit = async (e: FormData) => {
        startTransition(() => { handleSubmit(e).then((res) => { setMessageForm(res.message) }) })
    };

    return (
        <form action={handleFormSubmit} className="mt-10 flex flex-col border border-zinc-300 py-20 px-10 w-[900px] h-[450px] rounded-2xl gap-5 items-center">
            <input
                defaultValue={linkAtual}
                name="link"
                type="text"
                placeholder="Digite o novo link..."
                className="border border-zinc-300 rounded-2xl px-3 text-zinc-950 w-9/12 h-20 shadow-md"
            />
            <input
                name="hash"
                type="text"
                placeholder="Digite a hash de validação..."
                className="border border-zinc-300 rounded-2xl px-3 text-zinc-950 w-9/12 h-20 shadow-md"
            />
            <button
                type="submit"
                className={`mt-10 bg-green-400 hover:bg-green-600 transition-all rounded-2xl text-zinc-950 h-20 px-3 w-9/12 shadow-md text-center flex items-center justify-center font ${isPending ? 'cursor-not-allowed' : ''}`}
                disabled={isPending}
            >
                {isPending ? <SymbolIcon className="size-6 animate-spin" /> : 'ALTERAR LINK'}
            </button>
            {messageForm.sucess && <p className="text-zinc-800 text-2xl uppercase font-bold">{messageForm.sucess}</p>}
            {messageForm.error && <p className="text-red-600 text-2xl uppercase font-bold">{messageForm.error}</p>}
        </form>
    );
}