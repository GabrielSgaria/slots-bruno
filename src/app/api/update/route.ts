import { updateCards } from "@/lib/actions";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache"; // Importa a função revalidateTag para limpar o cache

export async function GET() {
    try {
        // Executa a função de atualização dos dados dos cartões
        const updateCard = await updateCards();

        // Invalida o cache para que seja atualizado na próxima requisição
        revalidateTag('cards');
        revalidateTag('cards-pg');
        revalidateTag('cards-pp');
        revalidateTag('link-casa'); // Caso também deseje invalidar o cache do link

        // Responde com sucesso após a atualização e limpeza do cache
        return NextResponse.json({ updateCard, success: true, message: "Dados atualizados e cache invalidado" });
    } catch (error) {
        console.error("Erro ao atualizar os dados dos cartões:", error);
        return new NextResponse("Erro no servidor", { status: 500 });
    }
}





// import { updateCards } from "@/lib/actions";
// import { revalidateTag } from "next/cache";
// import { NextResponse } from "next/server";


// export async function GET() {
//     try {
//         const updateCard = await updateCards();
//         revalidateTag('cards-pg')
//         revalidateTag('cards-pp')
//         return NextResponse.json(updateCard);
//     } catch (error) {
//         console.error(error);
//         return new NextResponse("Server error", { status: 500 });
//     }
// }
