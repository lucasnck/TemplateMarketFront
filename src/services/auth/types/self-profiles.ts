export type SelfProfilesResponse = {
  profiles: Profile[]
  activeProfile: ActiveProfile
}

type Profile = {
  name: string
  identification: string
  type: string
  createdDate: string
}

type ActiveProfile = {
  roles: string[]
} & Profile
