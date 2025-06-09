import PublicPage from '@/components/auth/PublicPage'
import FieldEmailInput from '@/components/form/FieldEmailInput'
import FieldInput from '@/components/form/FieldInput'
import FieldMaskedInput from '@/components/form/FieldMaskedInput'
import FieldPasswordInput from '@/components/form/FieldPasswordInput'
import { FormProvider } from '@/components/form/FormProvider'
import LoadingButton from '@/components/loading-button/LoadingButton'
import { useAuth } from '@/contexts/AuthProvider'
import { useApiFormMutation } from '@/hooks/useApiFormMutation'
import { register } from '@/services/auth'
import { RegisterResponse } from '@/services/auth/types/register'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { defaultValues, fieldMap, formConfig, RegisterFormValues, schema } from './form'

export default function RegisterPage() {
  const auth = useAuth()

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const mutation = useApiFormMutation<RegisterResponse, RegisterFormValues>(form, fieldMap, {
    mutationFn: register,
    onSuccess: ({ data }) => {
      const token = data.data?.token
      if (token) auth.login(token)
    },
  })

  const onSubmit = (data: RegisterFormValues) => mutation.mutate(data)

  return (
    <PublicPage>
      <div className="max-w-md mx-auto mt-12 p-6 border rounded-md bg-white">
        <h1 className="text-2xl font-bold mb-4">Criar Conta</h1>

        <FormProvider form={form} onSubmit={onSubmit}>
          <FieldInput {...formConfig.name} />
          <FieldEmailInput {...formConfig.email} />
          <FieldMaskedInput {...formConfig.phone} />
          <FieldMaskedInput {...formConfig.identification} />
          <FieldPasswordInput {...formConfig.password} />
          <FieldPasswordInput {...formConfig.confirmationPassword} />

          <LoadingButton type="submit" loading={mutation.isPending} color="primary" fullWidth>
            Registrar
          </LoadingButton>
        </FormProvider>
      </div>
    </PublicPage>
  )
}
