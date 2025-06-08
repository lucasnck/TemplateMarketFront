import utils from '@/lib/utils/utils'
import { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'solid' | 'outline'
type Color = 'default' | 'primary' | 'danger'
type Size = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: Variant
  color?: Color
  size?: Size
  fullWidth?: boolean
}

const base =
  'inline-flex items-center justify-center rounded font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed'

const variants: Record<Variant, Record<Color, string>> = {
  solid: {
    default: 'bg-gray-800 text-white hover:bg-gray-700',
    primary: 'bg-blue-600 text-white hover:bg-blue-500',
    danger: 'bg-red-600 text-white hover:bg-red-500',
  },
  outline: {
    default: 'border border-gray-300 text-gray-800 hover:bg-gray-100',
    primary: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
    danger: 'border border-red-600 text-red-600 hover:bg-red-50',
  },
}

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-3 text-lg',
}

export default function Button({
  children,
  variant = 'solid',
  color = 'default',
  size = 'md',
  fullWidth,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={utils.cn(
        base,
        variants[variant][color],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
