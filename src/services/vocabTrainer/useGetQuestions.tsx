import { TQuestion } from '@/pages/vocab-trainer/types'
import { useQuery } from 'react-query'
import { httpClient } from '../settings'
import { VOCAB_TRAINER_KEYS } from './queryKeys'

const getQuestions = async (id: string) => {
  const { data } = await httpClient.get<TQuestion[]>(
    `/vocabTrainer/question/${id}`
  )
  return data
}

export const useGetQuestions = (id: string) => {
  return useQuery({
    queryKey: [VOCAB_TRAINER_KEYS.QUESTION_VOCAB_TRAINER, id],
    queryFn: () => getQuestions(id),
    enabled: !!id
  })
}
