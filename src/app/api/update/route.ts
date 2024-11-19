import { purgeApiCache, updateCards } from "@/lib/actions";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Atualiza os dados no banco e no cache local
        const updateResult = await updateCards();

        if (updateResult.success) {
            // Purga o cache dinâmico
            revalidateTag("cards");
            revalidateTag("cards-pg");
            revalidateTag("cards-pp");
            revalidateTag("link-casa");

            console.log("Tags revalidated successfully.");
            return NextResponse.json({
                success: true,
                message: "Dados atualizados e cache invalidado.",
                updateResult,
            });
        } else {
            return new NextResponse("Erro ao atualizar os dados.", { status: 400 });
        }
    } catch (error) {
        console.error("Erro ao atualizar os dados:", error);
        return new NextResponse("Erro no servidor.", { status: 500 });
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
