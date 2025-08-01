import { usePostLogin } from '@/services/auth/usePostLogin'
import { usePostSignup } from '@/services/auth/usePostSignup'
import { usePostLogout } from '@/services/auth/usePostLogout'
import { useGetCurrentUser } from '@/services/auth/useGetCurrentUser'

export const useAuth = () => {
  const loginMutation = usePostLogin()
  const signupMutation = usePostSignup()
  const logoutMutation = usePostLogout()
  const { data: currentUser, isLoading: isLoadingUser } = useGetCurrentUser()

  return {
    login: loginMutation.mutate,
    signup: signupMutation.mutate,
    logout: logoutMutation.mutate,
    isLoading: loginMutation.isLoading || signupMutation.isLoading || logoutMutation.isLoading || isLoadingUser,
    isAuthenticated: !!currentUser,
  }
}
