import { selfProfiles } from '@/services/auth'
import { SelfProfilesResponse } from '@/services/auth/types/self-profiles'
import { ApiResponse } from '@/services/types/api'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

type AuthContextType = {
  user: AxiosResponse<ApiResponse<SelfProfilesResponse>, any> | undefined | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
  refetch: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: (_token: string) => {},
  logout: () => {},
  refetch: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [shouldFetchSelf, setShouldFetchSelf] = useState(false)
  const queryClient = useQueryClient()
  const router = useRouter()

  // Executa só no client para checar o token inicial
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (saved) setShouldFetchSelf(true)
  }, [setShouldFetchSelf])

  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['auth', 'self'],
    queryFn: selfProfiles,
    enabled: shouldFetchSelf,
    retry: false,
  })

  const login = useCallback(
    (token: string) => {
      console.log('login', token)
      localStorage.setItem('token', token)
      setShouldFetchSelf(true)
    },
    [setShouldFetchSelf]
  )

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    queryClient.removeQueries({ queryKey: ['auth', 'self'] })
    setShouldFetchSelf(false)
    router.push('/entrar')
  }, [queryClient, router])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
