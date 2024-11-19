import { updateCards } from "@/lib/actions";
import { NextResponse } from "next/server";

export async function GET() {
    console.log("API Update: Starting update process...");

    try {
        const result = await updateCards();
        if (result.success) {
            console.log("API Update: Cards updated successfully.");
            return NextResponse.json({ success: true, message: "Cards and cache updated successfully." });
        } else {
            return new NextResponse("Failed to update cards.", { status: 500 });
        }
    } catch (error) {
        console.error("API Update: Error during update process:", error);
        return new NextResponse("Internal server error.", { status: 500 });
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
