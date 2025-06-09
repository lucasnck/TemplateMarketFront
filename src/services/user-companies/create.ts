// src/lib/services/auth/register.ts
import api from '@/services/api'
import { CreatePayload, CreateResponse } from './types/create'
import { ApiResponse } from '../types/api'

export const create = (data: CreatePayload) => {
  return api.post<ApiResponse<CreateResponse>>('/UserCompanies', data)
}
