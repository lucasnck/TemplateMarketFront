import { ReactNode } from 'react'
import Icon from '../Icon/Icon'
import Button, { ButtonProps } from '../button/Button'

interface Props extends ButtonProps {
  loading?: boolean
  children: ReactNode
}

export default function LoadingButton({ loading, children, disabled, ...props }: Props) {
  return (
    <Button disabled={disabled || loading} {...props}>
      {loading && <Icon name="LoaderCircle" className="w-4 h-4 animate-spin mr-2" />}
      {children}
    </Button>
  )
}
