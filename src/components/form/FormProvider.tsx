import { ReactNode } from 'react'
import { FieldValues, FormProvider as RHFormProvider, useForm } from 'react-hook-form'

type Props<T extends FieldValues> = {
  form: ReturnType<typeof useForm<T>>
  children: ReactNode
  onSubmit: (data: T) => void
}

export function FormProvider<T extends FieldValues>({ form, children, onSubmit }: Props<T>) {
  return (
    <RHFormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {children}
      </form>
    </RHFormProvider>
  )
}
