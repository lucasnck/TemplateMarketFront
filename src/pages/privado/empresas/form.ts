// src/pages/privado/empresas/filterSchema.ts
import { z } from 'zod'

export const formConfig = {
  name: {
    name: 'name',
    label: 'Nome da Empresa',
    type: 'text',
    value: '',
    validator: z.string().optional(),
  },
  identification: {
    name: 'identification',
    label: 'CNPJ',
    type: 'text',
    value: '',
    validator: z.string().optional(),
  },
}

export const schema = z.object({
  name: formConfig.name.validator,
  identification: formConfig.identification.validator,
})

export type FormValues = z.infer<typeof schema>

export const defaultValues: FormValues = {
  name: formConfig.name.value,
  identification: formConfig.identification.value,
}
