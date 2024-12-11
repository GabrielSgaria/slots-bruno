import { NextResponse } from 'next/server';
import { updateCards } from '@/lib/actions';
import { getCache, isCacheValid } from '@/lib/cache';

const RATE_LIMIT_WINDOW = 60000; // 1 minute in milliseconds
const MAX_REQUESTS_PER_WINDOW = 10;

let requestCount = 0;
let windowStart = Date.now();

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
    let cachedData = await getCache();
    if (!cachedData || !(await isCacheValid())) {
      console.log('Cache não encontrado ou inválido. Atualizando cards...');
      const updateResult = await updateCards();
      if (!updateResult.success) {
        throw new Error('Failed to update cards');
      }
      cachedData = await getCache(); // Get the updated cache
      console.log('Cards atualizados com sucesso.');
    }

    if (cachedData) {
      console.log('Dados atualizados:', cachedData);
      return NextResponse.json({
        success: true,
        message: 'Data is up to date',
        serverTimestamp: now,
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

