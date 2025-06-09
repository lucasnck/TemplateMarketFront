import { useFormContext } from 'react-hook-form'
import EmailInput from './EmailInput'
import Field from './Field'

type Props = {
  name: string
  label: string
  placeholder?: string
  type?: string
  className?: string
  showSuggestions?: boolean
  autoComplete?: string
}

export default function FieldEmailInput({
  name,
  label,
  placeholder,
  type = 'text',
  className,
  showSuggestions,
  autoComplete,
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const errorMessage = (errors[name]?.message ?? '') as string | undefined

  return (
    <Field label={label} error={errorMessage}>
      <EmailInput
        {...register(name)}
        name={name}
        placeholder={placeholder}
        type={type}
        className={className}
        showSuggestions={showSuggestions}
        autoComplete={autoComplete}
      />
    </Field>
  )
}
