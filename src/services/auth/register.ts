// src/lib/services/auth/register.ts
import api from '@/services/api'
import { RegisterPayload, RegisterResponse } from './types/register'
import { ApiResponse } from '../types/api'

export const register = (data: RegisterPayload) => {
  return api.post<ApiResponse<RegisterResponse>>('/Auth/register', data)
}
