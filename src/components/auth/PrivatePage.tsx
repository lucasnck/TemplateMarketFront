'use client'

import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from '@/contexts/AuthProvider'

type Props = {
  children: React.ReactNode
}

export default function PrivatePage({ children }: Props) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/entrar')
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading || !isAuthenticated) return null

  return <>{children}</>
}
