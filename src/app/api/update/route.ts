import { updateCards } from "@/lib/actions";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET() {
    try {
        // Chama a função que realiza a atualização dos dados
        const updateCardResult = await updateCards();

        // Verifica se a atualização foi bem-sucedida
        if (updateCardResult.success) {
            // Se a atualização foi bem-sucedida, realiza a invalidação de cache
            revalidateTag('cards');
            revalidateTag('cards-pg');
            revalidateTag('cards-pp');
            revalidateTag('link-casa');

            // Retorna uma resposta positiva
            return NextResponse.json({
                success: true,
                message: "Dados atualizados e cache invalidado",
                updateCardResult,
            });
        } else {
            // Caso a atualização não tenha sido bem-sucedida
            return new NextResponse("Erro ao atualizar os dados dos cartões", { status: 400 });
        }
    } catch (error) {
        console.error("Erro ao atualizar os dados dos cartões:", error);
        return new NextResponse("Erro no servidor", { status: 500 });
    }
}








// import axios from "axios";
// import { purgeApiCache, updateCards } from "@/lib/actions";
// import { NextResponse } from "next/server";

// export async function GET() {
//     try {
//         // Atualiza os dados dinâmicos no servidor
//         const updateCardResult = await updateCards();

//         if (updateCardResult.success) {
//             // Purga apenas o cache relacionado aos dados dinâmicos no Cloudflare
//             await purgeApiCache();

//             return NextResponse.json({
//                 success: true,
//                 message: "Dados atualizados e cache dinâmico invalidado.",
//                 updateCardResult,
//             });
//         } else {
//             return new NextResponse("Erro ao atualizar os dados.", { status: 400 });
//         }
//     } catch (error) {
//         console.error("Erro ao atualizar os dados:", error);
//         return new NextResponse("Erro no servidor.", { status: 500 });
//     }
// }
