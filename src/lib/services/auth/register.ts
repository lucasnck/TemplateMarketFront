// src/lib/services/auth/register.ts
import api from '@/lib/api'
import { RegisterPayload } from './types'

export const register = (data: RegisterPayload) => {
  return api.post('/Auth/register', data)
}
