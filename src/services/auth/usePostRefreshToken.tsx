import { useMutation } from 'react-query'
import { Auth } from '../endPoints'
import { httpClient } from '../settings'
import { TLoginUserRes } from './usePostLogin'

export const postRefreshToken = async () => {
  const res = await httpClient.post<TLoginUserRes>(Auth.refresh, {
    withCredentials: true
  })
  return res
}

export const usePostRefreshToken = () => {
  return useMutation({
    mutationFn: postRefreshToken,
  })
}
