import { toast } from '@/components/ui/use-toast'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { Auth } from '../endPoints'
import {  httpClient } from '../settings'

export type TPostLoginReq = {
  email: string
  password: string
}

export type TLoginUserRes = {
  accessToken: string
  email: string
  name: string
  userId: string
}

const postLogin = async (data: TPostLoginReq) => {
  const res = await httpClient.post<TLoginUserRes>(Auth.signin, data)
  return res
}

export const usePostLogin = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: postLogin,
    onSuccess: () => {
      navigate('/')
      toast({
        title: 'Success',
        description: 'Login successfully'
      })
    }
  })
}
