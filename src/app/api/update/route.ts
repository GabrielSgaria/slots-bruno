import { NextResponse } from 'next/server';
import { updateCards } from '@/lib/actions';
import { getCache, setCache } from '@/lib/cache';
import { format, toZonedTime } from 'date-fns-tz';

const RATE_LIMIT_WINDOW = 60000; // 1 minute in milliseconds
const MAX_REQUESTS_PER_WINDOW = 10;
const BRASILIA_TIMEZONE = 'America/Sao_Paulo';

let requestCount = 0;
let windowStart = Date.now();

function formatDateTimeBrasilia(date: Date): string {
  const brasiliaDate = toZonedTime(date, BRASILIA_TIMEZONE);
  return format(brasiliaDate, 'HH:mm:ss', { timeZone: BRASILIA_TIMEZONE });
}

export async function GET() {
  // Rate limiting
  const now = Date.now();
  if (now - windowStart > RATE_LIMIT_WINDOW) {
    requestCount = 0;
    windowStart = now;
  }
  requestCount++;

  if (requestCount > MAX_REQUESTS_PER_WINDOW) {
    return NextResponse.json({
      success: false,
      message: 'Rate limit exceeded. Please try again later.',
      serverTimestamp: now,
    }, { status: 429 });
  }

  try {
    console.log('Iniciando atualização...');
    const updateResult = await updateCards();
    if (!updateResult.success) {
      throw new Error('Failed to update cards');
    }

    const cachedData = await getCache();
    if (cachedData) {
      const currentTime = new Date();
      const formattedUpdateTime = formatDateTimeBrasilia(currentTime);
      
      // Atualiza o cache com o novo horário
      await setCache({
        ...cachedData,
        updateTime: currentTime.toISOString(),
      });

      console.log('Dados atualizados:', { ...cachedData, updateTime: formattedUpdateTime });
      return NextResponse.json({
        success: true,
        message: 'Data updated successfully',
        serverTimestamp: now,
        updateTime: formattedUpdateTime,
      }, {
        headers: {
          'Cache-Control': 'no-store, max-age=0',
          'Pragma': 'no-cache'
        }
      });
    } else {
      throw new Error('Failed to retrieve cache after update');
    }
  } catch (error) {
    console.error('Erro ao atualizar cards:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      serverTimestamp: Date.now(),
    }, { 
      status: 500,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'Pragma': 'no-cache'
      }
    });
  }
}

