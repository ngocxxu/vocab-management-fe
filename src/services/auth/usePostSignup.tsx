import { toast } from '@/components/ui/use-toast'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { Auth } from '../endPoints'
import { httpClient } from '../settings'

export type TPostSignupReq = {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  avatar: string
  role: string
}

const postSignup = async (data: TPostSignupReq) => {
  const res = await httpClient.post(Auth.signup, data)
  return res
}

export const usePostSignup = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: postSignup,
    onSuccess: () => {
      navigate('/signup-success')
      toast({
        title: 'Success',
        description: 'Signup successfully'
      })
    }
  })
}
