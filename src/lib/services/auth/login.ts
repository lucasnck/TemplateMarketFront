// src/lib/services/auth/login.ts
import api from '@/lib/api'
import { LoginPayload, LoginResponse } from './types'

export const login = (data: LoginPayload) => {
  return api.post<LoginResponse>('/Auth/login', data)
}
