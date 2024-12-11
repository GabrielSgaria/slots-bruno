import { NextResponse } from 'next/server';
import { getCache, initializeCache } from '@/lib/cache';
import { format, toZonedTime } from 'date-fns-tz';

const BRASILIA_TIMEZONE = 'America/Sao_Paulo';

function formatDateTimeBrasilia(dateTimeString: string): string {
  const date = new Date(dateTimeString);
  const brasiliaDate = toZonedTime(date, BRASILIA_TIMEZONE);
  return format(brasiliaDate, 'HH:mm:ss', { timeZone: BRASILIA_TIMEZONE });
}

export async function GET() {
  try {
    await initializeCache();
    const cachedData = await getCache();
    if (cachedData && cachedData.updateTime) {
      const formattedUpdateTime = formatDateTimeBrasilia(cachedData.updateTime);
      return NextResponse.json({
        success: true,
        updateTime: formattedUpdateTime,
        serverTimestamp: Date.now(),
      });
    } else {
      // If cache is still not available, return a temporary response
      const currentBrasiliaTime = formatDateTimeBrasilia(new Date().toISOString());
      return NextResponse.json({
        success: true,
        updateTime: currentBrasiliaTime,
        serverTimestamp: Date.now(),
        message: 'Cache not yet available, using current Brasília time',
      });
    }
  } catch (error) {
    console.error('Error fetching latest data:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      serverTimestamp: Date.now(),
    }, { status: 500 });
  }
}

