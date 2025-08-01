import { TVocabSubject } from '@/pages/settings/types'
import { useQuery } from 'react-query'
import { ResponseAPI } from '../../utils/types'
import { httpClient } from '../settings'
import { Notification } from '../endPoints'
import { NOTIFICATION_KEYS } from './queryKeys'

const getUnreadNotification = async () => {
  const { data } = await httpClient.get<ResponseAPI<TVocabSubject[]>>(
    Notification.getUnread
  )
  return data
}
export const useGetUnreadNotification = () => {
  return useQuery({
    queryKey: [NOTIFICATION_KEYS.GET_UNREAD_NOTIFICATION],
    queryFn: () => getUnreadNotification()
  })
}
