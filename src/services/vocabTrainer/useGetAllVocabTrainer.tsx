import { TVocabTrainer } from '@/pages/vocab-trainer/types'
import { useQuery } from 'react-query'
import { ResponseAPI, TVocabTrainerQuery } from '../../utils/types'
import { VocabTrainer } from '../endPoints'
import { httpClient } from '../settings'
import { VOCAB_TRAINER_KEYS } from './queryKeys'

const getAllVocabTrainer = async (pageOptions: TVocabTrainerQuery) => {
  const params = new URLSearchParams()

  Object.entries(pageOptions).map(([key, value]) => {
    if (typeof value === 'string') {
      if (value !== undefined) {
        params.append(`${key}`, value.toString())
      }
    } 
    else {
      if (value !== undefined && (value as string[]).length > 0) {
        (value as string[]).forEach((item) => {
          params.append(`${key}`, item)
        })
      }
    }
  })

  const { data } = await httpClient.get<ResponseAPI<TVocabTrainer[]>>(
    `${VocabTrainer.getAll}?${params.toString()}`
  )
  return data
}

export const useGetAllVocabTrainer = (pageOptions: TVocabTrainerQuery) => {
  return useQuery({
    queryKey: [VOCAB_TRAINER_KEYS.GET_ALL_VOCAB_TRAINER, pageOptions],
    queryFn: () => getAllVocabTrainer(pageOptions)
  })
}
