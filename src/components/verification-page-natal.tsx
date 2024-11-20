'use client'

import { usePathname } from 'next/navigation'
import { ChristmasDecorations } from './decoration'

export function ChristmasDecorationsManager() {
  const pathname = usePathname()
  const isDownloadApp = pathname === '/download-app'

  if (isDownloadApp) {
    return null
  }

  return <ChristmasDecorations />
}