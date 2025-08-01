import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { Auth } from '../endPoints'
import { httpClient } from '../settings'

const postLogout = async () => {
  const res = await httpClient.post(Auth.signout)
  return res
}

export const usePostLogout = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      // Clear localStorage
      localStorage.removeItem('userInfo')
      
      // Clear all queries
      queryClient.clear()
      
      // Redirect to login
      navigate('/login')
    },
    onError: () => {
      // Even if logout fails, clear local state
      localStorage.removeItem('userInfo')
      queryClient.clear()
      navigate('/login')
    }
  })
}
