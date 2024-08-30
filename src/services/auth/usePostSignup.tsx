import { toast } from '@/components/ui/use-toast'
import { useMutation } from 'react-query'
import { Auth } from '../endPoints'
import { httpClient } from '../settings'

export type TPostSignupReq = {
  email: string
  password: string
}

const postSignup = async (data: TPostSignupReq) => {
  const res = await httpClient.post(Auth.signup, data)
  return res
}

export const usePostSignup = () => {
  return useMutation({
    mutationFn: postSignup,
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Signup successfully'
      })
    }
  })
}
