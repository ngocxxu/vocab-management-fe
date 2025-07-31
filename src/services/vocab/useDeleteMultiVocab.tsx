import { useToast } from '@/components/ui/use-toast'
import { useMutation, useQueryClient } from 'react-query'
import { httpClient } from '../settings'
import { Vocab } from '../endPoints'
import { VOCAB_KEYS } from './queryKeys'

const deleteMultiVocab = async (ids: string[]) => {
  const { data } = await httpClient.post(Vocab.bulkDelete, ids)
  return data
}

export const useDeleteMultiVocab = () => {
  const { toast } = useToast()
  const client = useQueryClient()

  return useMutation({
    mutationFn: (ids: string[]) => deleteMultiVocab(ids),
    onSuccess: () => {
      client.invalidateQueries([VOCAB_KEYS.GET_VOCAB])
      toast({
        title: 'Success',
        description: 'Deleted all successfully'
      })
    },
  })
}
