// src/components/form/Input.tsx
import { forwardRef } from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input {...props} ref={ref} className={`w-full border p-2 rounded ${props.className ?? ''}`} />
  )
})

export default Input
