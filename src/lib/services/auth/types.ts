export type LoginPayload = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
}

export type RegisterPayload = {
  name: string
  email: string
  phone: string
  identification: string
  password: string
}
