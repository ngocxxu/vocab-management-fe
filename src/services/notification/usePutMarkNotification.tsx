import { useMutation, useQueryClient } from 'react-query'
import { httpClient } from '../settings'
import { NOTIFICATION_KEYS } from './queryKeys'

export type TPutMarkNotifications = {
  notificationId: string
  userId: string
}

const putMarkNotification = async (item: TPutMarkNotifications) => {
  const res = await httpClient.put(`/`, item)
  return res
}

export const usePutMarkNotification = () => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: (item: TPutMarkNotifications) => putMarkNotification(item),
    onSuccess: () => {
      client.invalidateQueries([NOTIFICATION_KEYS.PUT_MARK_NOTIFICATION])
      // toast({
      //   title: 'Success',
      //   description: 'Updated successfully'
      // })
    }
  })
}
