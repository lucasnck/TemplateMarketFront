import { forwardRef, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import Input from './Input'
import Button from '../button/Button'

const domainSuggestions = ['@gmail.com', '@outlook.com', '@hotmail.com']

export interface EmailInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showSuggestions?: boolean
}

const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>((props, ref) => {
  const showSuggestions = props.showSuggestions ?? false
  const name = props.name ?? 'email'
  const { register, setValue, watch } = useFormContext()
  const [value, setLocalValue] = useState('')

  const formValue = watch(name)

  useEffect(() => {
    setLocalValue(formValue ?? '')
  }, [formValue])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setLocalValue(val)
    setValue(name, val)
  }

  const handleSuggestion = (domain: string) => {
    let completed = value
    if (value.includes('@')) {
      completed = value.split('@')[0] + domain
    } else {
      completed = value + domain
    }

    setLocalValue(completed)
    setValue(name, completed, { shouldValidate: true })
  }

  return (
    <div>
      <Input
        {...register(name)}
        value={value}
        onChange={handleChange}
        ref={ref}
        placeholder="Email"
        className={props.className}
      />

      {showSuggestions && (
        <div className="flex gap-2 mt-2">
          {domainSuggestions.map((domain) => (
            <Button
              key={domain}
              type="button"
              size="sm"
              variant="outline"
              color="default"
              className="text-xs px-2 py-1 rounded-full"
              onClick={() => handleSuggestion(domain)}
            >
              {domain}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
})

EmailInput.displayName = 'EmailInput'
export default EmailInput
