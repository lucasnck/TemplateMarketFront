'use client'

import { useAuth } from '@/contexts/AuthProvider'
import { UserCircle } from 'lucide-react'

export default function Header() {
  const { user } = useAuth()
  const activeProfile = user?.data?.data?.activeProfile

  return (
    <header className="flex justify-between items-center px-6 py-4 border-b bg-white shadow-sm">
      <div className="text-2xl font-bold">TemplateMarket</div>

      <div className="flex items-center gap-4">
        <div className="text-right text-sm hidden sm:block">
          <div className="font-medium">{activeProfile?.name ?? '---'}</div>
          <div className="text-gray-500">{activeProfile?.identification ?? '---'}</div>
        </div>
        <UserCircle className="w-8 h-8 text-gray-600" />
      </div>
    </header>
  )
}
