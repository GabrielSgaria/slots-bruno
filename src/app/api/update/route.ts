import { updateCards } from "@/lib/actions";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET() {
    try {

        const updateCard = await updateCards();

        revalidateTag('cards');
        revalidateTag('cards-pg');
        revalidateTag('cards-pp');
        revalidateTag('link-casa');

        return NextResponse.json({ updateCard, success: true, message: "Dados atualizados e cache invalidado" });
    } catch (error) {
        console.error("Erro ao atualizar os dados dos cartões:", error);
        return new NextResponse("Erro no servidor", { status: 500 });
    }
}