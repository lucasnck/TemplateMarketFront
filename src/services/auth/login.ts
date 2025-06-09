// src/lib/services/auth/login.ts
import api from '@/services/api'
import { LoginPayload, LoginResponse } from './types/login'
import { ApiResponse } from '../types/api'

export const login = (data: LoginPayload) => {
  return api.post<ApiResponse<LoginResponse>>('/Auth/login', data)
}
