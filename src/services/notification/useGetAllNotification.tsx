import { TVocabSubject } from '@/pages/settings/types'
import { useQuery } from 'react-query'
import { ResponseAPI } from '../../utils/types'
import { httpClient } from '../settings'
import { NOTIFICATION_KEYS } from './queryKeys'

const getAllNotification = async (userId: string) => {
  const { data } = await httpClient.get<ResponseAPI<TVocabSubject[]>>(
    `/notification/${userId}`
  )
  return data
}
export const useGetAllNotification = (userId: string) => {
  return useQuery({
    queryKey: [NOTIFICATION_KEYS.GET_NOTIFICATION],
    queryFn: () => getAllNotification(userId)
  })
}
