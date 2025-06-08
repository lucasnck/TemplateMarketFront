import { ReactNode } from 'react'
import { FieldError } from 'react-hook-form'

type Props = {
  label: string
  error?: string
  children: ReactNode
}

export default function Field({ label, error, children }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      {children}
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  )
}
