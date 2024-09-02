import { toast } from '@/components/ui/use-toast'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { Auth } from '../endPoints'
import { ACCESSTOKEN, httpClient } from '../settings'

export type TPostLoginReq = {
  email: string
  password: string
}

export type TLoginUserRes = {
  accessToken: string
  email: string
  name: string
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
      localStorage.setItem(ACCESSTOKEN, data.accessToken)
      localStorage.setItem(
        'userInfo',
        JSON.stringify({ email: data.email, name: data.name })
      )
      navigate('/')
      toast({
        title: 'Success',
        description: 'Login successfully'
      })
    }
  })
}
