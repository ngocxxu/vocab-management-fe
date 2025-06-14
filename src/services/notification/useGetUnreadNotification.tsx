import { TVocabSubject } from '@/pages/settings/types'
import { useQuery } from 'react-query'
import { ResponseAPI } from '../../utils/types'
import { httpClient } from '../settings'
import { NOTIFICATION_KEYS } from './queryKeys'

const getUnreadNotification = async (userId: string) => {
  const { data } = await httpClient.get<ResponseAPI<TVocabSubject[]>>(
    `/notification/unread/${userId}`
  )
  return data
}
export const useGetUnreadNotification = (userId: string) => {
  return useQuery({
    queryKey: [NOTIFICATION_KEYS.GET_UNREAD_NOTIFICATION],
    queryFn: () => getUnreadNotification(userId)
  })
}
