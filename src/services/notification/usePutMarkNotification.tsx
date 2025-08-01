import { useMutation, useQueryClient } from 'react-query'
import { httpClient } from '../settings'
import { Notification } from '../endPoints'
import { NOTIFICATION_KEYS } from './queryKeys'

export type TPutMarkNotification = {
  notificationId: string
}

const putMarkNotification = async (item: TPutMarkNotification) => {
  const res = await httpClient.put(Notification.markAsRead(item.notificationId))
  return res
}

export const usePutMarkNotification = () => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: (item: TPutMarkNotification) => putMarkNotification(item),
    onSuccess: () => {
      client.invalidateQueries([NOTIFICATION_KEYS.GET_NOTIFICATION])
    }
  })
}
