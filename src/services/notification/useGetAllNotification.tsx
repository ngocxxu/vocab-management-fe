import { TNotification } from '@/pages/layout/types'
import { useQuery } from 'react-query'
import { httpClient } from '../settings'
import { Notification } from '../endPoints'
import { NOTIFICATION_KEYS } from './queryKeys'

const getAllNotification = async (userId: string) => {
  const { data } = await httpClient.get<TNotification[]>(
    Notification.getAll(userId)
  )
  return data
}
export const useGetAllNotification = (userId: string) => {
  return useQuery({
    enabled: !!userId,
    queryKey: [NOTIFICATION_KEYS.GET_NOTIFICATION],
    queryFn: () => {
      return userId ? getAllNotification(userId) : null
    }
  })
}
