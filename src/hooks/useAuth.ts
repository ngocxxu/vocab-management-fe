import { clearAccessToken } from '@/redux/reducer/auth'
import { RootState } from '@/redux/store'
import { usePostLogin } from '@/services/auth/usePostLogin'
import { usePostSignup } from '@/services/auth/usePostSignup'
import { useQueryClient } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'

export const useAuth = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const accessToken = useSelector((state: RootState) => state.auth)

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
