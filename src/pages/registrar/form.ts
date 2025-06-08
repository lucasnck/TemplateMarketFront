import { z } from 'zod'

export const formConfig = {
  name: {
    name: 'name',
    label: 'Nome',
    placeholder: 'Seu nome completo',
    value: '',
    validate: z.string().min(2, 'Nome muito curto'),
  },
  email: {
    name: 'email',
    label: 'Email',
    placeholder: 'Seu melhor email',
    value: '',
    validate: z.string().email('Email inválido'),
    showSuggestions: true,
  },
  phone: {
    name: 'phone',
    label: 'Telefone',
    placeholder: '(99) 99999-9999',
    mask: '(99) 99999-9999',
    value: '',
    validate: z.string().min(8, 'Telefone inválido'),
  },
  identification: {
    name: 'identification',
    label: 'CPF',
    placeholder: '000.000.000-00',
    mask: '999.999.999-99',
    value: '',
    validate: z.string().min(11, 'CPF/CNPJ inválido'),
  },
  password: {
    name: 'password',
    label: 'Senha',
    placeholder: 'Crie uma senha forte',
    type: 'password',
    value: '',
    validate: z
      .string()
      .min(6, 'Senha muito curta')
      .regex(/[A-Z]/, 'Deve conter uma letra maiúscula')
      .regex(/[0-9]/, 'Deve conter um número'),
  },
}

export const schema = z.object({
  name: formConfig.name.validate,
  email: formConfig.email.validate,
  phone: formConfig.phone.validate,
  identification: formConfig.identification.validate,
  password: formConfig.password.validate,
})

export type RegisterFormValues = z.infer<typeof schema>

export const defaultValues: RegisterFormValues = {
  name: formConfig.name.value,
  email: formConfig.email.value,
  phone: formConfig.phone.value,
  identification: formConfig.identification.value,
  password: formConfig.password.value,
}
