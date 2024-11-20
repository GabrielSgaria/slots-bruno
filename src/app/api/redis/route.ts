import { NextResponse } from "next/server";
import redis from "@/lib/redis";

export async function GET() {
  try {
    // Teste de conexão
    await redis.set("teste", "funcionando");
    const value = await redis.get("teste");

    return NextResponse.json({ message: "Conexão com Redis funcionando!", value });
  } catch (error) {
    console.error("Erro ao conectar ao Redis:", error);
    return NextResponse.json({ error: "Erro ao conectar ao Redis" }, { status: 500 });
  }
}
