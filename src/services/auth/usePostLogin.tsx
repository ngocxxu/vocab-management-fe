import { toast } from '@/components/ui/use-toast'
import { setAccessToken } from '@/redux/reducer/auth'
import store from '@/redux/store'
import { useMutation } from 'react-query'
import { Auth } from '../endPoints'
import { httpClient, REFRESHTOKEN } from '../settings'

export type TPostLoginReq = {
  email: string
  password: string
}

export type TLoginUserRes = {
  accessToken: string
  refreshToken: string
}

const postLogin = async (data: TPostLoginReq) => {
  const res = await httpClient.post<TLoginUserRes>(Auth.login, data)
  return res
}

export const usePostLogin = () => {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: ({ data }) => {
      localStorage.setItem(REFRESHTOKEN, data.refreshToken)
      store.dispatch(setAccessToken(data.accessToken))
      toast({
        title: 'Success',
        description: 'Login successfully'
      })
    }
  })
}
