// src/components/home/GlobalSearch.tsx
'use client'

import { useState } from 'react'

export default function GlobalSearch() {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    // TODO: integrar com API /products/search?q=
    console.log('Searching for:', query)
  }

  return (
    <div className="relative w-64">
      <input
        type="text"
        placeholder="Search templates, services..."
        className="w-full px-4 py-2 border rounded-md shadow-sm"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
    </div>
  )
}
