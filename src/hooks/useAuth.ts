import { usePostLogin } from '@/services/auth/usePostLogin'
import { usePostSignup } from '@/services/auth/usePostSignup'
import { useQueryClient } from 'react-query'

export const useAuth = () => {
  const queryClient = useQueryClient()

  const loginMutation = usePostLogin()
  const signupMutation = usePostSignup()

  const logout = () => {
    queryClient.clear()
  }

  return {
    login: loginMutation.mutate,
    signup: signupMutation.mutate,
    logout,
    isLoading: loginMutation.isLoading
  }
}
