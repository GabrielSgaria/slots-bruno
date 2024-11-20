import { populateCacheFromDB } from "@/lib/cache";
import { updateCards } from "@/lib/actions";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Atualiza os cartões no banco de dados
    const updatedCards = await updateCards();
    if (!updatedCards.success) {
      throw new Error("Erro ao atualizar os cartões");
    }

    // Preenche o cache com os dados atualizados do banco
    const cacheUpdated = await populateCacheFromDB();
    if (!cacheUpdated.success) {
      throw new Error("Erro ao preencher o cache com dados do banco");
    }

    return NextResponse.json({
      success: true,
      message: "Dados atualizados e cache renovado",
    });
  } catch (error) {
    console.error("Erro ao atualizar os dados dos cartões:");
    return NextResponse.json({
      success: false,
      message: "Erro ao atualizar os dados",
    });
  }
}
