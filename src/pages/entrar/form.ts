import { z } from 'zod'

export const formConfig = {
  email: {
    name: 'email',
    label: 'Email',
    placeholder: 'Digite seu email',
    value: '',
    validator: z.string().email({ message: 'Email inválido' }),
  },
  password: {
    name: 'password',
    label: 'Senha',
    placeholder: 'Digite sua senha',
    value: '',
    validator: z.string().min(1, 'Senha obrigatória'),
  },
}

export const schema = z.object({
  email: formConfig.email.validator,
  password: formConfig.password.validator,
})

export type LoginFormValues = z.infer<typeof schema>

export const defaultValues: LoginFormValues = {
  email: formConfig.email.value,
  password: formConfig.password.value,
}
