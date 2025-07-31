import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { Auth } from '../endPoints'
import { ACCESSTOKEN, httpClient } from '../settings'

const postLogout = async () => {
  const res = await httpClient.post(Auth.signout)
  return res
}

export const usePostLogout = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      localStorage.removeItem(ACCESSTOKEN)
      localStorage.removeItem('userInfo')
      navigate('/login')
    }
  })
}
