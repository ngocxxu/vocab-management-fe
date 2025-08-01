import { toast } from '@/components/ui/use-toast'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { Auth } from '../endPoints'
import { httpClient } from '../settings'

export type TPostLoginReq = {
  email: string
  password: string
}

export type TLoginUserRes = {
  user: {
    id: string
    email: string
    phone: string
    createdAt: string
    updatedAt: string
    firstName: string
    lastName: string
    avatar: string
    role: string
    isActive: boolean
    supabaseUserId: string
  }
}

const postLogin = async (data: TPostLoginReq) => {
  const res = await httpClient.post<TLoginUserRes>(Auth.signin, data)
  return res
}

export const usePostLogin = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: postLogin,
    onSuccess: (res) => {
      localStorage.setItem(
        'userInfo',
        JSON.stringify({
          email: res.data.user.email,
          name: res.data.user.firstName + ' ' + res.data.user.lastName,
          avatar: res.data.user.avatar,
          role: res.data.user.role,
          firstName: res.data.user.firstName,
          lastName: res.data.user.lastName,
          userId: res.data.user.id
        })
      )
      
      navigate('/')
      toast({
        title: 'Success',
        description: 'Login successfully'
      })
    }
  })
}
