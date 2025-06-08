import { useState, forwardRef } from 'react'
import { useFormContext } from 'react-hook-form'
import Icon from '../Icon/Icon'

type Props = React.InputHTMLAttributes<HTMLInputElement>

const PasswordInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { register } = useFormContext()
  const [visible, setVisible] = useState(false)

  return (
    <div className="relative">
      <input
        {...props}
        {...register(props.name ?? '')}
        type={visible ? 'text' : 'password'}
        ref={ref}
        className={`w-full border p-2 rounded pr-10 ${props.className ?? ''}`}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute right-2 top-2 text-sm text-gray-600"
      >
        {visible ? <Icon name="EyeClosed" /> : <Icon name="Eye" />}
      </button>
    </div>
  )
})

export default PasswordInput
