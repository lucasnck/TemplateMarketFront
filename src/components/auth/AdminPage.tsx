'use client'

import { useAuth } from '@/contexts/AuthProvider'
import roles from '@/lib/roles/roles'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

type Props = {
  children: React.ReactNode
}

export default function AdminPage({ children }: Props) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  console.log('user?.data.data?.activeProfile', user?.data.data?.activeProfile)
  const isAdmin = user?.data.data?.activeProfile.roles.includes(roles.admin.base)
  console.log('isAdmin', isAdmin)

  useEffect(() => {
    if (!isLoading && user && !isAdmin) {
      router.replace('/')
    }
  }, [isLoading, user, router])

  return <>{children}</>
}
