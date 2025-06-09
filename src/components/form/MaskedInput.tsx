import { useEffect, useRef, useState } from 'react'
import IMask from 'imask'
import { useFormContext } from 'react-hook-form'

export default function MaskedInput() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [maskedValue, setMaskedValue] = useState('')
  const [unmaskedValue, setUnmaskedValue] = useState('')
  const { setValue, register } = useFormContext()

  const maskConfig = '+{55} (00) 00000-0000'

  useEffect(() => {
    if (!inputRef.current) return

    const mask = IMask(inputRef.current, {
      mask: maskConfig,
    })

    mask.on('accept', () => {
      setMaskedValue(mask.value)
      setUnmaskedValue(mask.unmaskedValue)
      setValue('phone1', mask.unmaskedValue, { shouldValidate: true })
    })

    return () => {
      mask.destroy()
    }
  }, [setValue])

  return (
    <div style={{ padding: 16 }}>
      <input type="hidden" {...register('phone1')} />

      <input ref={inputRef} placeholder="Telefone" />

      <p>
        📞 <strong>Com máscara:</strong> {maskedValue}
      </p>
      <p>
        🔢 <strong>Sem máscara:</strong> {unmaskedValue}
      </p>
    </div>
  )
}
