import { NextResponse } from 'next/server';
import { getCache, initializeCache } from '@/lib/cache';
import { format, toZonedTime } from 'date-fns-tz';

const BRASILIA_TIMEZONE = process.env.TZ || 'America/Sao_Paulo';

function formatDateTimeBrasilia(dateTimeString: string): string {
  const date = new Date(dateTimeString);
  const brasiliaDate = toZonedTime(date, BRASILIA_TIMEZONE);
  return format(brasiliaDate, 'HH:mm:ss', { timeZone: BRASILIA_TIMEZONE });
}

export async function GET() {
  console.log('Iniciando requisição GET para /api/get-latest-data');
  try {
    await initializeCache();
    const cachedData = await getCache();
    console.log('Dados do cache:', cachedData);
    
    if (cachedData && cachedData.updateTime) {
      const formattedUpdateTime = formatDateTimeBrasilia(cachedData.updateTime);
      console.log('Horário formatado:', formattedUpdateTime);
      return NextResponse.json({
        success: true,
        updateTime: formattedUpdateTime,
        serverTimestamp: Date.now(),
      });
    } else {
      console.log('Cache não disponível, usando horário atual');
      const currentBrasiliaTime = formatDateTimeBrasilia(new Date().toISOString());
      return NextResponse.json({
        success: true,
        updateTime: currentBrasiliaTime,
        serverTimestamp: Date.now(),
        message: 'Cache não disponível, usando horário atual de Brasília',
      });
    }
  } catch (error) {
    console.error('Erro ao buscar dados mais recentes:', error);
    return NextResponse.json({
      success: false,
      message: 'Erro interno do servidor',
      serverTimestamp: Date.now(),
    }, { status: 500 });
  }
}

