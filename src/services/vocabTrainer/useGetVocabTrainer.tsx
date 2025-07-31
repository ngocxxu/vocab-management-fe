import { TVocabTrainer } from '@/pages/vocab-trainer/types'
import { useQuery } from 'react-query'
import { httpClient } from '../settings'
import { VocabTrainer } from '../endPoints'
import { VOCAB_TRAINER_KEYS } from './queryKeys'

const getVocabTrainer = async (id: string) => {
  const { data } = await httpClient.get<TVocabTrainer>(VocabTrainer.getVocabTrainer(id))
  return data
}

export const useGetVocabTrainer = (id: string) => {
  return useQuery({
    queryKey: [VOCAB_TRAINER_KEYS.GET_VOCAB_TRAINER, id],
    queryFn: () => getVocabTrainer(id),
    enabled: !!id
  })
}
