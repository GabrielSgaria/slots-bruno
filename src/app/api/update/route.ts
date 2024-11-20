import { NextResponse } from 'next/server';
import { updateCards, getCardsPG, getCardsPP } from '@/lib/actions';

export async function GET() {
  try {
    // Atualize os dados no banco de dados
    await updateCards();

    // Busque os dados atualizados
    const cardsPG = await getCardsPG();
    const cardsPP = await getCardsPP();

    // Revalidação do cache (via Cloudflare, se necessário)
    await fetch(`https://api.cloudflare.com/client/v4/zones/d1904632fbeb9a8db0ed41324a6188aa/purge_cache`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer 97dbe17bfec74e57e223a79e7dfec71370269`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        files: ['https://www.grupofpsinais.com/api/update'], // A própria rota
      }),
    });

    // Retorne os dados ao frontend
    return NextResponse.json({ cardsPG, cardsPP });
  } catch (error) {
    console.error('Error updating cards:', error);
    return NextResponse.error();
  }
}
