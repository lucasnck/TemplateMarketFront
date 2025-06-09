'use client'

import Link from 'next/link'
import { useRouter } from 'next/router'

const links = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/usuarios', label: 'Usuários' },
  { href: '/admin/empresas', label: 'Empresas' },
  { href: '/admin/configuracoes', label: 'Configurações' },
]

export default function AdminSidebar() {
  const router = useRouter()

  return (
    <aside className="w-64 h-full bg-gray-100 border-r p-4 text-sm">
      <nav className="flex flex-col gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`p-2 rounded hover:bg-gray-200 ${
              router.pathname === link.href ? 'bg-gray-300 font-medium' : ''
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
