import { setAccessToken } from '@/redux/reducer/auth'
import store from '@/redux/store'
import { useMutation } from 'react-query'
import { Auth } from '../endPoints'
import { httpClient } from '../settings'
import { TLoginUserRes } from './usePostLogin'

export const postRefreshToken = async () => {
  const res = await httpClient.post<TLoginUserRes>(Auth.refreshToken)
  return res
}

export const usePostRefreshToken = () => {
  return useMutation({
    mutationFn: postRefreshToken,
    onSuccess: ({ data }) => {
      store.dispatch(setAccessToken(data.accessToken))
    }
  })
}
