import PrivatePage from '@/components/auth/PrivatePage'
import FieldEmailInput from '@/components/form/FieldEmailInput'
import FieldInput from '@/components/form/FieldInput'
import FieldMaskedInput from '@/components/form/FieldMaskedInput'
import { FormProvider } from '@/components/form/FormProvider'
import LoadingButton from '@/components/loading-button/LoadingButton'
import { useApiFormMutation } from '@/hooks/useApiFormMutation'
import { create } from '@/services/user-companies/create'
import { CreateResponse } from '@/services/user-companies/types/create'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { defaultValues, fieldMap, formConfig, FormValues, schema } from './form'
import { useAuth } from '@/contexts/AuthProvider'

export default function CreateCompanyPage() {
  const auth = useAuth()
  const router = useRouter()
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const mutation = useApiFormMutation<CreateResponse, FormValues>(form, fieldMap, {
    mutationFn: create,
    onSuccess: () => {
      toast.info('Empresa criada com sucesso')
      auth.refetch()
      router.push('/privado/empresas')
    },
  })

  const onSubmit = (data: FormValues) => mutation.mutate(data)

  return (
    <PrivatePage>
      <div className="p-6 border rounded-md bg-white">
        <h1 className="text-2xl font-bold mb-4">Cadastrar Empresa</h1>

        <FormProvider form={form} onSubmit={onSubmit}>
          <FieldInput {...formConfig.name} />
          <FieldEmailInput {...formConfig.email} />
          <FieldMaskedInput {...formConfig.phone} />
          <FieldMaskedInput {...formConfig.identification} />

          <LoadingButton type="submit" loading={mutation.isPending} color="primary" fullWidth>
            Cadastrar
          </LoadingButton>
        </FormProvider>
      </div>
    </PrivatePage>
  )
}
