import { toast } from '@/components/ui/use-toast'
import { useMutation } from 'react-query'
import { Auth } from '../endPoints'
import { httpClient } from '../settings'

export type TPostLoginReq = {
  email: string
  password: string
}

const postLogin = async (data: TPostLoginReq) => {
  const res = await httpClient.post(Auth.login, data)
  return res
}

export const usePostLogin = () => {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Login successfully'
      })
    }
  })
}
