import { TNotification } from '@/pages/layout/types'
import { useQuery } from 'react-query'
import { Notification } from '../endPoints'
import { httpClient } from '../settings'
import { NOTIFICATION_KEYS } from './queryKeys'

const getAllNotification = async () => {
  const { data } = await httpClient.get<TNotification[]>(Notification.getAll)
  return data
}
export const useGetAllNotification = () => {
  return useQuery({
    queryKey: [NOTIFICATION_KEYS.GET_NOTIFICATION],
    queryFn: () => {
      return getAllNotification()
    }
  })
}
