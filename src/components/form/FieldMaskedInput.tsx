import { useFormContext } from 'react-hook-form'
import Field from './Field'
import MaskedInput from './MaskedInput'

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
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const errorMessage = (errors[name]?.message ?? '') as string | undefined

  return (
    <Field label={label} error={errorMessage}>
      <MaskedInput
        mask={mask}
        {...register(name)}
        name={name}
        placeholder={placeholder}
        type={type}
        className={className}
      />
    </Field>
  )
}
