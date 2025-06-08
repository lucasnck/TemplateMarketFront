import { useFormContext } from 'react-hook-form'
import Field from './Field'
import Input from './Input'

type Props = {
  name: string
  label: string
  placeholder?: string
  type?: string
  className?: string
}

export default function FieldInput({ name, label, placeholder, type = 'text', className }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const errorMessage = (errors[name]?.message ?? '') as string | undefined

  return (
    <Field label={label} error={errorMessage}>
      <Input
        {...register(name)}
        name={name}
        placeholder={placeholder}
        type={type}
        className={className}
      />
    </Field>
  )
}
