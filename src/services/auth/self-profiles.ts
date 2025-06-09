import api from '@/services/api'
import { SelfProfilesResponse } from './types/self-profiles'
import { ApiResponse } from '../types/api'

export const selfProfiles = () => {
  return api.get<ApiResponse<SelfProfilesResponse>>('/Auth/Self/Profiles')
}
