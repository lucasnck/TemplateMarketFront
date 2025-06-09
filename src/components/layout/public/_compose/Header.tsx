'use client'

import Link from 'next/link'
import GlobalSearch from '../../_compose/GlobalSearch'

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-white shadow-sm">
      <Link href="/" className="text-2xl font-bold">
        TemplateMarket
      </Link>

      <GlobalSearch />

      <nav className="flex gap-4 items-center">
        <Link href="/entrar">Entrar</Link>
        <Link href="/registrar">Registrar</Link>
      </nav>
    </header>
  )
}
