import { toast } from '@/components/ui/use-toast'
import { setAccessToken } from '@/redux/reducer/auth'
import store from '@/redux/store'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { Auth } from '../endPoints'
import { httpClient } from '../settings'

export type TPostLoginReq = {
  email: string
  password: string
}

export type TLoginUserRes = {
  accessToken: string
}

const postLogin = async (data: TPostLoginReq) => {
  const res = await httpClient.post<TLoginUserRes>(Auth.login, data)
  return res
}

export const usePostLogin = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: postLogin,
    onSuccess: ({ data }) => {
      store.dispatch(setAccessToken(data.accessToken))
      navigate('/')
      toast({
        title: 'Success',
        description: 'Login successfully'
      })
    }
  })
}
