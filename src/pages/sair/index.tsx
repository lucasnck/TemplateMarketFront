import Icon from '@/components/Icon/Icon'
import PrivateLayout from '@/components/layout/private/PrivateLayout'
import { useAuth } from '@/contexts/AuthProvider'
import { useEffect } from 'react'

export default function LogoutPage() {
  const auth = useAuth()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      auth.logout()
    }
  }, [auth])

  if (typeof window === 'undefined') return null

  return (
    <PrivateLayout>
      <div className="flex items-center justify-center h-screen">
        <Icon name="LoaderCircle" className="w-4 h-4 animate-spin mr-2" />
      </div>
    </PrivateLayout>
  )
}
