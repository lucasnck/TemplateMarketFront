import errors from '@/lib/errors/errors'
import { AxiosError } from 'axios'
import { Path, UseFormReturn } from 'react-hook-form'

type FieldMap<T> = Partial<Record<string, Path<T>>>

export type ErrorType = {
  errors: Record<string, string[]>
}

export function useApiFormErrorHandler<T extends Record<string, any>>(
  form: UseFormReturn<T>,
  fieldMap: FieldMap<T> = {}
) {
  return (error: AxiosError<ErrorType>) => {
    if (error.response?.data.errors) {
      const apiErrors = error.response.data.errors
      Object.entries(apiErrors).forEach(([field, messages]) => {
        const mappedField = fieldMap[field] || (field.toLowerCase() as Path<T>)
        const message = Array.isArray(messages) ? messages[0] : messages
        const errorMessage = errors[message]
        if (errorMessage) form.setError(mappedField, { type: 'server', message: errorMessage })
      })
    }
  }
}
