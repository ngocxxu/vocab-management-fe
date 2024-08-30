import { clearAccessToken } from '@/redux/reducer/auth'
import { RootState } from '@/redux/store'
import { usePostLogin } from '@/services/auth/usePostLogin'
import { usePostRefreshToken } from '@/services/auth/usePostRefreshToken'
import { usePostSignup } from '@/services/auth/usePostSignup'
import { useQueryClient } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'

export const useAuth = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const accessToken = useSelector((state: RootState) => state.auth)

  const loginMutation = usePostLogin()
  const signupMutation = usePostSignup()


  const refreshMutation = usePostRefreshToken({
    refreshToken: localStorage.getItem('refreshToken') || ''
  })

  const logout = () => {
    dispatch(clearAccessToken())
    localStorage.removeItem('refreshToken')
    queryClient.clear()
  }

  return {
    accessToken,
    isAuthenticated: !!accessToken,
    login: loginMutation.mutate,
    signup: signupMutation.mutate,
    logout,
    isLoading: loginMutation.isLoading || refreshMutation.isLoading
  }
}
