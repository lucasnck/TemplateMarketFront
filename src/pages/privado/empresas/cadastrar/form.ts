import { generateFieldMap } from '@/lib/utils/utils'
import { z } from 'zod'

export const formConfig = {
  name: {
    name: 'name',
    baseName: 'Name',
    label: 'Nome',
    placeholder: 'Razão Social',
    value: '',
    validate: z.string().min(2, 'Nome muito curto'),
  },
  email: {
    name: 'email',
    baseName: 'Email',
    label: 'Email',
    placeholder: 'E-mail de contato da empresa',
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
    label: 'CNPJ',
    placeholder: '00.000.000/0000-00',
    mask: '00.000.000/{0001}-00',
    value: '',
    validate: z.string().min(11, 'CPF/CNPJ inválido'),
  },
}

export const schema = z.object({
  name: formConfig.name.validate,
  email: formConfig.email.validate,
  phone: formConfig.phone.validate,
  identification: formConfig.identification.validate,
})

export type FormValues = z.infer<typeof schema>

export const defaultValues: FormValues = {
  name: formConfig.name.value,
  email: formConfig.email.value,
  phone: formConfig.phone.value,
  identification: formConfig.identification.value,
}

export const fieldMap = generateFieldMap<FormValues>(formConfig)
