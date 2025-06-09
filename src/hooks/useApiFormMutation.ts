// hooks/useApiFormMutation.ts
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { ApiResponse } from '@/services/types/api'
import { useApiFormErrorHandler, ErrorType } from './useApiErrorHandler'
import { toast } from 'sonner'
import { Path, UseFormReturn } from 'react-hook-form'

export function useApiFormMutation<TResponse, TPayload extends Record<string, any>>(
  form: UseFormReturn<TPayload>,
  fieldMap: Partial<Record<string, Path<TPayload>>> = {},
  options: UseMutationOptions<
    AxiosResponse<ApiResponse<TResponse>>,
    AxiosError<ErrorType>,
    TPayload
  >
): UseMutationResult<AxiosResponse<ApiResponse<TResponse>>, AxiosError<ErrorType>, TPayload> {
  const handleApiError = useApiFormErrorHandler(form, fieldMap)

  return useMutation({
    ...options,
    onError: (error, variables, context) => {
      handleApiError(error)
      toast.error('Erro ao enviar o formulário.')
      options?.onError?.(error, variables, context)
    },
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context)
    },
  })
}
