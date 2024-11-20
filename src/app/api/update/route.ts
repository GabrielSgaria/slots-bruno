import { NextResponse } from 'next/server';
import { updateCards } from '@/lib/actions';

export async function GET() {
  try {
    // Atualize os dados no banco de dados
    const updateResult = await updateCards();

    if (updateResult.success) {
      // Retorne uma mensagem de sucesso
      return NextResponse.json(
        {
          success: true,
          message: 'Dados atualizados com sucesso e cache revalidado.',
        },
        { status: 200 }
      );
    } else {
      // Retorne uma mensagem de erro
      return NextResponse.json(
        {
          success: false,
          message: 'Erro ao atualizar os dados',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error updating cards:', error);
    return NextResponse.error();
  }
}
