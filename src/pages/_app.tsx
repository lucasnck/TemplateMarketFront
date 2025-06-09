import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@/contexts/AuthProvider'
import LayoutSelector from '@/components/layout/LayoutSelector'
import { Toaster } from 'sonner'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LayoutSelector>
          <Component {...pageProps} />
        </LayoutSelector>
      </AuthProvider>

      <Toaster position="top-right" />
    </QueryClientProvider>
  )
}
