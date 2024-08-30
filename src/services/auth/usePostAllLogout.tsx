import { useMutation } from 'react-query'
import { Auth } from '../endPoints'
import { httpClient } from '../settings'

export type TPostAllLogoutReq = {
  userId: string
}

const postAllLogout = async (data: TPostAllLogoutReq) => {
  const res = await httpClient.post(Auth.logoutAllDevice, data)
  return res
}

export const usePostAllLogout = () => {
  return useMutation({
    mutationFn: postAllLogout
  })
}
