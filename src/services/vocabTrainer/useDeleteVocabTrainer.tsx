import { useToast } from '@/components/ui/use-toast'
import { useMutation, useQueryClient } from 'react-query'
import { httpClient } from '../settings'
import { VocabTrainer } from '../endPoints'
import { VOCAB_TRAINER_KEYS } from './queryKeys'

const deleteVocabTrainer = async (id: string) => {
  const { data } = await httpClient.delete(VocabTrainer.delete(id))
  return data
}

export const useDeleteVocabTrainer = () => {
  const { toast } = useToast()
  const client = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteVocabTrainer(id),
    onSuccess: () => {
      client.invalidateQueries([VOCAB_TRAINER_KEYS.GET_ALL_VOCAB_TRAINER])
      toast({
        title: 'Success',
        description: 'Deleted successfully'
      })
    },
  })
}
