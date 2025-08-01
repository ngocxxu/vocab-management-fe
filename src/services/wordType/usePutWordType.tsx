import { useToast } from '@/components/ui/use-toast'
import { useMutation, useQueryClient } from 'react-query'
import { httpClient } from '../settings'
import { WordType } from '../endPoints'
import { WORD_TYPE_KEYS } from './queryKeys'
import { TUpdateWordType } from './types'

const putWordType = async (item: TUpdateWordType) => {
  const res = await httpClient.put(WordType.update(item.id), item.data)
  return res
}

export const usePutWordType = () => {
  const { toast } = useToast()
  const client = useQueryClient()

  return useMutation({
    mutationFn: (item: TUpdateWordType) => putWordType(item),
    onSuccess: () => {
      client.invalidateQueries([WORD_TYPE_KEYS.GET_WORD_TYPES])
      toast({
        title: 'Success',
        description: 'Word type updated successfully'
      })
    },
  })
} 