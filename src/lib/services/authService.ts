import api from '../api'

export type LoginPayload = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
}

export const login = (data: LoginPayload) => {
  return api.post<LoginResponse>('/Auth/login', data)
}
