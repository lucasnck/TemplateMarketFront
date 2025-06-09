import { generateFieldMap } from '@/lib/utils/utils'
import { z } from 'zod'

export const formConfig = {
  name: {
    name: 'name',
    baseName: 'Name',
    label: 'Nome',
    placeholder: 'Seu nome completo',
    value: '',
    validate: z.string().min(2, 'Nome muito curto'),
  },
  email: {
    name: 'email',
    baseName: 'Email',
    label: 'Email',
    placeholder: 'Seu melhor email',
    value: '',
    validate: z.string().email('Email inválido'),
    showSuggestions: true,
  },
  phone: {
    name: 'phone',
    baseName: 'Phone',
    label: 'Telefone',
    placeholder: '+55 (99) 99999-9999',
    mask: '+{55} (00) 00000-0000',
    value: '',
    validate: z.string().min(8, 'Telefone inválido'),
  },
  identification: {
    name: 'identification',
    baseName: 'Identification',
    label: 'CPF',
    placeholder: '000.000.000-00',
    mask: '000.000.000-00',
    value: '',
    validate: z.string().min(11, 'CPF/CNPJ inválido'),
  },
  password: {
    name: 'password',
    baseName: 'Password',
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
  confirmationPassword: {
    name: 'confirmationPassword',
    baseName: 'ConfirmationPassword',
    label: 'Confirme a Senha',
    placeholder: 'Repita sua senha',
    type: 'password',
    value: '',
    validate: z.string().min(6, 'Confirmação obrigatória'),
  },
}

export const schema = z
  .object({
    name: formConfig.name.validate,
    email: formConfig.email.validate,
    phone: formConfig.phone.validate,
    identification: formConfig.identification.validate,
    password: formConfig.password.validate,
    confirmationPassword: formConfig.confirmationPassword.validate,
  })
  .refine((data) => data.password === data.confirmationPassword, {
    path: ['confirmationPassword'],
    message: 'As senhas não coincidem',
  })

export type RegisterFormValues = z.infer<typeof schema>

export const defaultValues: RegisterFormValues = {
  name: formConfig.name.value,
  email: formConfig.email.value,
  phone: formConfig.phone.value,
  identification: formConfig.identification.value,
  password: formConfig.password.value,
  confirmationPassword: formConfig.confirmationPassword.value,
}

export const fieldMap = generateFieldMap<RegisterFormValues>(formConfig)
