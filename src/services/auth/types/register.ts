export type RegisterPayload = {
  name: string
  email: string
  phone: string
  identification: string
  password: string
}

export type RegisterResponse = {
  name: string
  email: string
  phone: string
  identification: string
  password: string
  token: string
}
