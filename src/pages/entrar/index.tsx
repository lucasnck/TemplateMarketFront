import PublicPage from '@/components/auth/PublicPage'
import FieldEmailInput from '@/components/form/FieldEmailInput'
import FieldPasswordInput from '@/components/form/FieldPasswordInput'
import { FormProvider } from '@/components/form/FormProvider'
import LoadingButton from '@/components/loading-button/LoadingButton'
import { useAuth } from '@/contexts/AuthProvider'
import { login } from '@/services/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { defaultValues, formConfig, LoginFormValues, schema } from './form'
import { toast } from 'sonner'
import { useRouter } from 'next/router'

export default function LoginPage() {
  const auth = useAuth()
  const router = useRouter()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const mutation = useMutation({
    mutationFn: async (data: LoginFormValues) => await login(data),
    onSuccess: (res) => {
      auth.login(res.data.data ?? '')
    },
    onError: () => toast.error('Email ou senha inválidos'),
  })

  const onSubmit = (data: LoginFormValues) => mutation.mutate(data)

  return (
    <PublicPage>
      <div className="max-w-md mx-auto mt-12 p-6 border rounded-md bg-white">
        <h1 className="text-2xl font-bold mb-4">Entrar</h1>

        <FormProvider form={form} onSubmit={onSubmit} autoComplete>
          <FieldEmailInput {...formConfig.email} />
          <FieldPasswordInput {...formConfig.password} />

          <LoadingButton type="submit" loading={mutation.isPending} color="primary" fullWidth>
            Entrar
          </LoadingButton>
        </FormProvider>
      </div>
    </PublicPage>
  )
}
