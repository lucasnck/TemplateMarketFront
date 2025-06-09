'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthProvider'
import { ChevronDown, UserCircle } from 'lucide-react'
import Link from 'next/link'
import GlobalSearch from '../../_compose/GlobalSearch'
import CartButton from '@/components/cart/CartButton'

export default function Header() {
  const { user } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const active = user?.data?.data?.activeProfile
  const profiles = user?.data?.data?.profiles || []

  const isPartner = active?.roles?.includes('Partner')

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-white shadow-sm relative z-20">
      <Link href="/" className="text-2xl font-bold">
        TemplateMarket
      </Link>

      <GlobalSearch />

      <div className="flex items-center gap-4 justify-between">
        <CartButton />
        <div className="relative">
          <button
            className="flex items-center gap-2 text-sm"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <div className="text-right hidden sm:block">
              <div className="font-medium">{active?.name}</div>
              <div className="text-gray-500 text-xs">{active?.identification}</div>
            </div>
            <UserCircle className="w-8 h-8 text-gray-600" />
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded border text-sm p-3">
              <div className="mb-3">
                <div className="font-medium text-gray-800">Minha conta</div>
                <ul className="mt-2 space-y-1">
                  <li>
                    <Link href="/privado//minha-conta" className="hover:underline">
                      Dados da conta
                    </Link>
                  </li>
                  <li>
                    <Link href="/privado//seguranca" className="hover:underline">
                      Segurança
                    </Link>
                  </li>
                  <li>
                    <Link href="/privado//compras" className="hover:underline">
                      Minhas compras
                    </Link>
                  </li>
                  <li>
                    <Link href="/privado/empresas/cadastrar" className="hover:underline">
                      Cadastrar empresa
                    </Link>
                  </li>
                  <li>
                    <Link href="/privado/empresas" className="hover:underline">
                      Minhas empresas
                    </Link>
                  </li>
                </ul>
              </div>

              {isPartner && (
                <div className="mb-3">
                  <div className="font-medium text-gray-800">Parceiro</div>
                  <ul className="mt-2 space-y-1">
                    <li>
                      <Link href="/parceiro/empresa" className="hover:underline">
                        Perfil da empresa
                      </Link>
                    </li>
                    <li>
                      <Link href="/parceiro/produtos" className="hover:underline">
                        Meus produtos
                      </Link>
                    </li>
                    <li>
                      <Link href="/parceiro/servicos" className="hover:underline">
                        Meus serviços
                      </Link>
                    </li>
                    <li>
                      <Link href="/parceiro/vendas" className="hover:underline">
                        Minhas vendas
                      </Link>
                    </li>
                    <li>
                      <Link href="/parceiro/anuncios" className="hover:underline">
                        Meus anúncios
                      </Link>
                    </li>
                    <li>
                      <Link href="/parceiro/vitrines" className="hover:underline">
                        Minhas vitrines
                      </Link>
                    </li>
                    <li>
                      <Link href="/parceiro/carteira" className="hover:underline">
                        Carteira
                      </Link>
                    </li>
                  </ul>
                </div>
              )}

              <div className="mt-3">
                <div className="font-medium text-gray-800">Trocar perfil</div>
                <ul className="mt-2 space-y-1">
                  {profiles
                    .filter((p) => p.identification !== active?.identification)
                    .map((p, i) => (
                      <li key={i}>
                        <button
                          className="w-full text-left hover:underline"
                          onClick={() => console.log('Trocar para:', p.identification)}
                        >
                          <div className="flex flex-col">
                            <span>{p.name}</span>
                            <span>{p.identification}</span>
                          </div>
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="mt-3">
                <ul className="mt-2 space-y-1">
                  <li>
                    <Link href="/sair">Sair</Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
