import { useFormContext } from 'react-hook-form'
import Field from './Field'

type Option = {
  value: string
  label: string
}

type Props = {
  name: string
  label: string
  options: Option[]
  placeholder?: string
  className?: string
}

export default function FieldSelect({
  name,
  label,
  options,
  placeholder = 'Selecione...',
  className,
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const errorMessage = (errors[name]?.message ?? '') as string | undefined

  return (
    <Field label={label} error={errorMessage}>
      <select
        {...register(name)}
        name={name}
        className={`border p-2 rounded w-full ${className ?? ''}`}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </Field>
  )
}
