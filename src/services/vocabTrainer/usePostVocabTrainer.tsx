import { useToast } from '@/components/ui/use-toast'
import { TCreateVocabTrainer } from '@/pages/vocab-trainer/types'
import { useMutation, useQueryClient } from 'react-query'
import { httpClient } from '../settings'
import { VocabTrainer } from '../endPoints'
import { VOCAB_TRAINER_KEYS } from './queryKeys'

const postVocabTrainer = async (data: TCreateVocabTrainer) => {
  const res = await httpClient.post(VocabTrainer.create, data)
  return res
}

export const usePostVocabTrainer = () => {
  const { toast } = useToast()
  const client = useQueryClient()

  return useMutation({
    mutationFn: (data: TCreateVocabTrainer) => postVocabTrainer(data),
    onSuccess: () => {
      client.invalidateQueries([VOCAB_TRAINER_KEYS.GET_ALL_VOCAB_TRAINER])
      toast({
        title: 'Success',
        description: 'Created successfully'
      })
    },
  })
}
