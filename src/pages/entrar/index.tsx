import FieldEmailInput from '@/components/form/FieldEmailInput'
import FieldPasswordInput from '@/components/form/FieldPasswordInput'
import { FormProvider } from '@/components/form/FormProvider'
import Icon from '@/components/Icon/Icon'
import { login } from '@/lib/services/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { defaultValues, formConfig, LoginFormValues, schema } from './form'
import LoadingButton from '@/components/loading-button/LoadingButton'

export default function LoginPage() {
  const router = useRouter()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const mutation = useMutation({
    mutationFn: async (data: LoginFormValues) => login(data),
    onSuccess: (res) => {
      localStorage.setItem('token', res.data.token)
      router.push('/')
    },
    onError: () => alert('Email ou senha inválidos'),
  })

  const onSubmit = (data: LoginFormValues) => mutation.mutate(data)

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded-md bg-white">
      <h1 className="text-2xl font-bold mb-4">Entrar</h1>

      <FormProvider form={form} onSubmit={onSubmit}>
        <FieldEmailInput {...formConfig.email} />
        <FieldPasswordInput {...formConfig.password} />

        <LoadingButton type="submit" loading={mutation.isPending} color="primary" fullWidth>
          Entrar
        </LoadingButton>
      </FormProvider>
    </div>
  )
}
