// components/cart/CartButton.tsx
'use client'

import { Minus, Plus, ShoppingCart, X } from 'lucide-react'
import { useState } from 'react'

// Mock de items do carrinho
const mockItems = [
  {
    id: 1,
    name: 'Template Shopify Dark Green',
    price: 120,
    discountedPrice: 99,
    quantity: 1,
  },
  {
    id: 2,
    name: 'Landing Page NFT',
    price: 200,
    discountedPrice: 150,
    quantity: 2,
  },
]

function CartSidebar({ onClose }: { onClose: () => void }) {
  const [items, setItems] = useState(mockItems)

  const updateQuantity = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    )
  }

  const total = items.reduce((sum, i) => sum + i.discountedPrice * i.quantity, 0)
  const fullTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <div className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-lg z-50 p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Carrinho</h2>
        <button onClick={onClose}>
          <X className="w-6 h-6" />
        </button>
      </div>

      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id} className="border-b pb-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500 line-through">R$ {item.price.toFixed(2)}</p>
                <p className="text-lg font-bold text-green-600">
                  R$ {item.discountedPrice.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQuantity(item.id, -1)}>
                  <Minus className="w-4 h-4" />
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)}>
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between mb-2">
          <span>Total cheio:</span>
          <span className="line-through">R$ {fullTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total com desconto:</span>
          <span className="text-green-600">R$ {total.toFixed(2)}</span>
        </div>
        <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Finalizar Compra
        </button>
      </div>
    </div>
  )
}

export default function CartButton() {
  const [isOpen, setIsOpen] = useState(false)
  const itemsCount = mockItems.reduce((acc, i) => acc + i.quantity, 0)

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="relative">
        <ShoppingCart className="w-6 h-6" />
        {itemsCount > 0 && (
          <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1.5">
            {itemsCount}
          </span>
        )}
      </button>
      {isOpen && <CartSidebar onClose={() => setIsOpen(false)} />}
    </>
  )
}
