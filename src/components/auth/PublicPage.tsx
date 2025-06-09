'use client'

import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from '@/contexts/AuthProvider'

type Props = {
  children: React.ReactNode
}

export default function PublicPage({ children }: Props) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/')
    }
  }, [isAuthenticated, isLoading, router])

  // se está carregando ou já autenticado, não renderiza o conteúdo
  if (isLoading || isAuthenticated) return null

  return <>{children}</>
}
