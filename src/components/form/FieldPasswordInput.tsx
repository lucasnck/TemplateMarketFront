import { useFormContext } from 'react-hook-form'
import Field from './Field'
import PasswordInput from './PasswordInput'

type Props = {
  name: string
  label: string
  placeholder?: string
  type?: string
  className?: string
  autoComplete?: string
}

export default function FieldPasswordInput({
  name,
  label,
  placeholder,
  type = 'text',
  className,
  autoComplete,
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const errorMessage = (errors[name]?.message ?? '') as string | undefined

  return (
    <Field label={label} error={errorMessage}>
      <PasswordInput
        {...register(name)}
        name={name}
        placeholder={placeholder}
        type={type}
        className={className}
        autoComplete={autoComplete}
      />
    </Field>
  )
}
