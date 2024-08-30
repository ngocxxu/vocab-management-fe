import { useMutation } from 'react-query'
import { Auth } from '../endPoints'
import { httpClient } from '../settings'

export type TPostRefreshTokenReq = {
  refreshToken: string
}

const postRefreshToken = async (data: TPostRefreshTokenReq) => {
  const res = await httpClient.post(Auth.refreshToken, data)
  return res
}

export const usePostRefreshToken = () => {
  return useMutation({
    mutationFn: postRefreshToken
  })
}
