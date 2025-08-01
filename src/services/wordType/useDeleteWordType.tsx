import { useToast } from '@/components/ui/use-toast'
import { useMutation, useQueryClient } from 'react-query'
import { httpClient } from '../settings'
import { WordType } from '../endPoints'
import { WORD_TYPE_KEYS } from './queryKeys'

const deleteWordType = async (id: string) => {
  const { data } = await httpClient.delete(WordType.delete(id))
  return data
}

export const useDeleteWordType = () => {
  const { toast } = useToast()
  const client = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteWordType(id),
    onSuccess: () => {
      client.invalidateQueries([WORD_TYPE_KEYS.GET_WORD_TYPES])
      toast({
        title: 'Success',
        description: 'Word type deleted successfully'
      })
    },
  })
} 