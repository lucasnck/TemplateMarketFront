export type ApiResponse<T> = {
  success: boolean
  data: T | null
  errors: Record<string, string[]> | null
}
