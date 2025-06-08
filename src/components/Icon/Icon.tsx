// src/components/Icon/Icon.tsx
import * as LucideIcons from 'lucide-react'
import { LucideProps } from 'lucide-react'

type IconName = keyof typeof LucideIcons

type Props = {
  name: IconName
} & LucideProps

export default function Icon({ name, ...props }: Props) {
  const LucideIcon = LucideIcons[name] as React.FC<LucideProps>

  return <LucideIcon {...props} />
}
