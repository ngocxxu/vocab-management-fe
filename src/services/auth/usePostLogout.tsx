import { useMutation } from 'react-query'
import { Auth } from '../endPoints'
import { httpClient } from '../settings'

const postLogout = async () => {
  const res = await httpClient.post(Auth.logout)
  return res
}

export const usePostLogout = () => {
  return useMutation({
    mutationFn: postLogout
  })
}
