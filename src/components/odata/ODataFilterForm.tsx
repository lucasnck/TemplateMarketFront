import { ReactNode } from 'react'
import { UseFormReturn, FieldValues } from 'react-hook-form'
import { FormProvider } from '@/components/form/FormProvider'

type Props<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues>
  onSubmit: (values: TFormValues) => void
  children: ReactNode
}

export default function ODataFilterForm<TFormValues extends FieldValues>({
  form,
  onSubmit,
  children,
}: Props<TFormValues>) {
  return (
    <FormProvider form={form} onSubmit={onSubmit}>
      <div className="flex gap-4 items-end mb-4">
        {children}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Filtrar
        </button>
      </div>
    </FormProvider>
  )
}
