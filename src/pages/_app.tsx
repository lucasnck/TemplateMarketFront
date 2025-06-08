import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Header isAuthenticated={false} />
      <main className="max-w-7xl mx-auto px-4">
        <Component {...pageProps} />
      </main>
      <Footer />
    </QueryClientProvider>
  )
}
