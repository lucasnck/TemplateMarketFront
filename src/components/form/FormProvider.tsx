import { ReactNode } from 'react'
import { FieldValues, FormProvider as RHFormProvider, useForm } from 'react-hook-form'

type Props<T extends FieldValues> = {
  form: ReturnType<typeof useForm<T>>
  children: ReactNode
  onSubmit: (data: T) => void
  autoComplete?: boolean
}

export function FormProvider<T extends FieldValues>({
  form,
  children,
  onSubmit,
  autoComplete,
}: Props<T>) {
  return (
    <RHFormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        autoComplete={autoComplete ? 'on' : 'off'}
      >
        {children}
      </form>
    </RHFormProvider>
  )
}
