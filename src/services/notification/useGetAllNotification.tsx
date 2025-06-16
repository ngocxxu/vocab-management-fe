import { TNotification } from '@/pages/layout/types'
import { useQuery } from 'react-query'
import { httpClient } from '../settings'
import { NOTIFICATION_KEYS } from './queryKeys'

const getAllNotification = async (userId: string) => {
  const { data } = await httpClient.get<TNotification[]>(
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
