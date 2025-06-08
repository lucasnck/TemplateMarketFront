// src/components/form/MaskedInput.tsx
import { useInputMask } from 'use-mask-input'
import { forwardRef, useEffect, useRef } from 'react'

type Props = {
  name: string
  mask: string
  placeholder?: string
} & React.InputHTMLAttributes<HTMLInputElement>

const MaskedInput = forwardRef<HTMLInputElement, Props>(({ mask, ...props }, ref) => {
  const innerRef = useInputMask({ mask }) // correto: retorna um RefObject

  // conecta o ref externo (forwardRef)
  useEffect(() => {
    if (!ref) return
    if (typeof ref === 'function') ref(innerRef.current)
    else (ref as React.MutableRefObject<HTMLInputElement | null>).current = innerRef.current
  }, [ref])

  return (
    <input
      {...props}
      ref={innerRef}
      className={`w-full border p-2 rounded ${props.className ?? ''}`}
    />
  )
})

MaskedInput.displayName = 'MaskedInput'
export default MaskedInput
