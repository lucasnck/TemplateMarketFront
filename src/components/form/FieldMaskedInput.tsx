import IMask from 'imask'
import { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import Field from './Field'
import Input from './Input'

type Props = {
  name: string
  label: string
  mask: string
  placeholder?: string
  type?: string
  className?: string
}

export default function FieldMaskedInput({
  name,
  label,
  placeholder,
  type = 'text',
  className,
  mask,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [maskedValue, setMaskedValue] = useState('')
  const [unmaskedValue, setUnmaskedValue] = useState('')
  const {
    setValue,
    register,
    formState: { errors },
  } = useFormContext()

  const maskConfig = mask

  useEffect(() => {
    if (!inputRef.current) return

    const mask = IMask(inputRef.current, {
      mask: maskConfig,
    })

    mask.on('accept', () => {
      setMaskedValue(mask.value)
      setUnmaskedValue(mask.unmaskedValue)
      setValue(name, mask.unmaskedValue, { shouldValidate: true })
    })

    return () => {
      mask.destroy()
    }
  }, [setValue])

  const errorMessage = (errors[name]?.message ?? '') as string | undefined

  return (
    <Field label={label} error={errorMessage}>
      <input type="hidden" {...register(name)} />

      <Input ref={inputRef} placeholder={placeholder} type={type} className={className} />
    </Field>
  )
}
