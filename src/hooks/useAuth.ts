import { clearAccessToken } from '@/redux/reducer/auth'
import { usePostLogin } from '@/services/auth/usePostLogin'
import { usePostSignup } from '@/services/auth/usePostSignup'
import { ACCESSTOKEN } from '@/services/settings'
import { useQueryClient } from 'react-query'
import { useDispatch } from 'react-redux'

export const useAuth = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const accessToken = localStorage.getItem(ACCESSTOKEN)

  const loginMutation = usePostLogin()
  const signupMutation = usePostSignup()

  const logout = () => {
    dispatch(clearAccessToken())
    queryClient.clear()
  }

  return {
    accessToken,
    isAuthenticated: !!accessToken,
    login: loginMutation.mutate,
    signup: signupMutation.mutate,
    logout,
    isLoading: loginMutation.isLoading
  }
}
