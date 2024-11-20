import { NextResponse } from 'next/server';
import { updateCards } from '@/lib/actions';

export async function GET() {
  try {
    // Atualize os dados no banco de dados
    await updateCards();

    // Revalidação do cache (via Cloudflare, se necessário)
    const cloudflareResponse = await fetch(`https://api.cloudflare.com/client/v4/zones/d1904632fbeb9a8db0ed41324a6188aa/purge_cache`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer 97dbe17bfec74e57e223a79e7dfec71370269`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        files: ['https://www.grupofpsinais.com/api/update'], // A própria rota
      }),
    });

    if (!cloudflareResponse.ok) {
      const errorDetails = await cloudflareResponse.json();
      console.error('Erro ao limpar cache do Cloudflare:', errorDetails);
      return NextResponse.json(
        { success: false, message: 'Erro ao limpar cache no Cloudflare' },
        { status: 500 }
      );
    }

    // Retorne os dados ao frontend
    return NextResponse.json(
      {
        success: true,
        message: 'Dados atualizados com sucesso e cache revalidado',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating cards:', error);
    return NextResponse.error();
  }
}
