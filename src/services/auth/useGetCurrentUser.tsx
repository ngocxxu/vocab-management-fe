import { useQuery, useQueryClient } from 'react-query'
import { Auth } from '../endPoints'
import { httpClient } from '../settings'
import { TLoginUserRes } from './usePostLogin'
import { useNavigate } from 'react-router-dom'

export const getCurrentUser = async () => {
  const res = await httpClient.get<TLoginUserRes>(Auth.verify)
  return res.data
}

export const useGetCurrentUser = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!localStorage.getItem('userInfo'),
    onError: () => {
        localStorage.removeItem('userInfo')
        queryClient.clear()
        navigate('/login')
      }
  })
} 