// src/pages/registrar/index.tsx
import FieldEmailInput from '@/components/form/FieldEmailInput'
import FieldInput from '@/components/form/FieldInput'
import FieldMaskedInput from '@/components/form/FieldMaskedInput'
import FieldPasswordInput from '@/components/form/FieldPasswordInput'
import { FormProvider } from '@/components/form/FormProvider'
import Icon from '@/components/Icon/Icon'
import { register } from '@/lib/services/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { defaultValues, formConfig, RegisterFormValues, schema } from './form'
import LoadingButton from '@/components/loading-button/LoadingButton'

export default function RegisterPage() {
  const router = useRouter()

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const mutation = useMutation({
    mutationFn: async (data: RegisterFormValues) => register(data),
    onSuccess: () => router.push('/entrar'),
    onError: () => alert('Erro ao registrar'),
  })

  const onSubmit = (data: RegisterFormValues) => mutation.mutate(data)

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded-md bg-white">
      <h1 className="text-2xl font-bold mb-4">Criar Conta</h1>

      <FormProvider form={form} onSubmit={onSubmit}>
        <FieldInput {...formConfig.name} />
        <FieldEmailInput {...formConfig.email} />
        <FieldMaskedInput {...formConfig.phone} />
        <FieldMaskedInput {...formConfig.identification} />
        <FieldPasswordInput {...formConfig.password} />

        <LoadingButton type="submit" loading={mutation.isPending} color="primary" fullWidth>
          Registrar
        </LoadingButton>
      </FormProvider>
    </div>
  )
}
