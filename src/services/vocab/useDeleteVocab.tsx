import { useToast } from '@/components/ui/use-toast'
import { useMutation, useQueryClient } from 'react-query'
import { httpClient } from '../settings'
import { Vocab } from '../endPoints'
import { VOCAB_KEYS } from './queryKeys'

const deleteVocab = async (id: string) => {
  const { data } = await httpClient.delete(Vocab.delete(id))
  return data
}

export const useDeleteVocab = () => {
  const { toast } = useToast()
  const client = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteVocab(id),
    onSuccess: () => {
      client.invalidateQueries([VOCAB_KEYS.GET_VOCAB])
      toast({
        title: 'Success',
        description: 'Deleted successfully'
      })
    },
  })
}
