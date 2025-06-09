import AdminPage from '@/components/auth/AdminPage'
import { useAuth } from '@/contexts/AuthProvider'

export default function RegisterPage() {
  const auth = useAuth()
  return <AdminPage>admin page</AdminPage>
}
