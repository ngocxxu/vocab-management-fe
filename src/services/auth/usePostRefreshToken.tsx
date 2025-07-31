import { useMutation } from 'react-query'
import { Auth } from '../endPoints'
import { ACCESSTOKEN, httpClient } from '../settings'
import { TLoginUserRes } from './usePostLogin'

export const postRefreshToken = async () => {
  const res = await httpClient.post<TLoginUserRes>(Auth.refresh)
  return res
}

export const usePostRefreshToken = () => {
  return useMutation({
    mutationFn: postRefreshToken,
    onSuccess: ({ data }) => {
      localStorage.setItem(ACCESSTOKEN, data.accessToken)
    }
  })
}
