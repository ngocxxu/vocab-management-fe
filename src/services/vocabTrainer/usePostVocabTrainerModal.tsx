import { TFormInputsVocabTrainer } from '@/pages/vocab-trainer/types'
import { AxiosResponse } from 'axios'
import { useMutation, UseMutationOptions } from 'react-query'
import { httpClient } from '../settings'
import { VocabTrainer } from '../endPoints'

const postVocabTrainer = async (data: TFormInputsVocabTrainer) => {
  const res = await httpClient.post(VocabTrainer.create, data)
  return res
}

export const usePostVocabTrainerModal = (
  options?: UseMutationOptions<
    AxiosResponse<unknown, unknown>,
    unknown,
    TFormInputsVocabTrainer
  >
) => {
  return useMutation({
    ...options,
    mutationFn: postVocabTrainer
  })
}
