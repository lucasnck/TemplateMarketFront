import { useAuth } from '@/contexts/AuthProvider'
import roles from '@/lib/roles/roles'
import PublicLayout from './public/PublicLayout'
import { useRouter } from 'next/router'
import AdminLayout from './admin/AdminLayout'
import PrivateLayout from './private/PrivateLayout'

type Props = {
  children: React.ReactNode
}

export default function LayoutSelector({ children }: Props) {
  const { isAuthenticated, user, isLoading } = useAuth()
  const router = useRouter()

  if (isLoading) return null // ou spinner

  if (!isAuthenticated) return <PublicLayout>{children}</PublicLayout>

  const path = router.pathname
  const userRoles = user?.data?.data?.activeProfile?.roles || []

  if (path.startsWith('/admin') && userRoles.includes(roles.admin.base)) {
    return <AdminLayout>{children}</AdminLayout>
  }

  return <PrivateLayout>{children}</PrivateLayout>
}
