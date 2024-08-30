import { setAccessToken } from '@/redux/reducer/auth'
import store from '@/redux/store'
import { useMutation } from 'react-query'
import { Auth } from '../endPoints'
import { httpClient } from '../settings'
import { AxiosResponse } from 'axios'
import { TLoginUserRes } from './usePostLogin'

export type TPostRefreshTokenReq = {
  refreshToken: string
}

export const postRefreshToken = async (data: TPostRefreshTokenReq) => {
  const res = await httpClient.post<AxiosResponse<TLoginUserRes>>(Auth.refreshToken, data)
  return res.data
}

export const usePostRefreshToken = (data: TPostRefreshTokenReq) => {
  return useMutation({
    mutationFn: () => postRefreshToken(data),
    onSuccess: ({ data }) => {
      store.dispatch(setAccessToken(data.accessToken))
    }
  })
}
