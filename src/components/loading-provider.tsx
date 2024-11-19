'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Loading from '@/components/loading-page'

export default function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleStart = () => setIsLoading(true)
    const handleComplete = () => setIsLoading(false)

    const simulateLoading = () => {
      handleStart()
      setTimeout(handleComplete, 500) // Ajuste este valor conforme necessário
    }

    simulateLoading()
  }, [pathname, searchParams])

  return isLoading ? <Loading /> : children
}