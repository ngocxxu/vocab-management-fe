import { useMutation, useQueryClient } from 'react-query'
import { httpClient } from '../settings'
import { NOTIFICATION_KEYS } from './queryKeys'

export type TPutMarkAllNotification = {
  userId: string
}

const putMarkAllNotification = async (item: TPutMarkAllNotification) => {
  const res = await httpClient.put(`/notification/mark-all`, item)
  return res
}

export const usePutMarkAllNotification = () => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: (item: TPutMarkAllNotification) => putMarkAllNotification(item),
    onSuccess: () => {
      client.invalidateQueries([NOTIFICATION_KEYS.GET_NOTIFICATION])
    }
  })
}
