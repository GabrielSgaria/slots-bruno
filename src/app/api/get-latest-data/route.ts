import { NextResponse } from 'next/server';
import { getCache, initializeCache } from '@/lib/cache';

function formatDateTime(dateTimeString: string): string {
  const date = new Date(dateTimeString);
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
}

export async function GET() {
  try {
    await initializeCache();
    const cachedData = await getCache();
    if (cachedData && cachedData.updateTime) {
      const formattedUpdateTime = formatDateTime(cachedData.updateTime);
      return NextResponse.json({
        success: true,
        updateTime: formattedUpdateTime,
        serverTimestamp: Date.now(),
      });
    } else {
      // If cache is still not available, return a temporary response
      return NextResponse.json({
        success: true,
        updateTime: formatDateTime(new Date().toISOString()),
        serverTimestamp: Date.now(),
        message: 'Cache not yet available, using current time',
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

