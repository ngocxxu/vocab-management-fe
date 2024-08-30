import { useMutation } from 'react-query'
import { Auth } from '../endPoints'
import { httpClient } from '../settings'

export type TPostLogoutReq = {
  refreshToken: string
}

const postLogout = async (data: TPostLogoutReq) => {
  const res = await httpClient.post(Auth.logout, data)
  return res
}

export const usePostLogout = () => {
  return useMutation({
    mutationFn: postLogout
  })
}
