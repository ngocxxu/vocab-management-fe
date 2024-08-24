import { defaultOnError } from '@/main'
import { TFormTestVocabTrainer } from '@/pages/vocab-trainer/types'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { httpClient } from '../settings'

const submitTest = async ({ id, ...data }: TFormTestVocabTrainer) => {
  const res = await httpClient.patch(`/vocabTrainer/test/${id}`, data)
  return res
}

export const useSubmitTest = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: TFormTestVocabTrainer) => submitTest(data),
    onSuccess: () => {
      navigate('/vocab-trainer/examination/result')
    },
    onError: (err: AxiosError) => {
      defaultOnError(err)
      navigate('/vocab-trainer')
    }
  })
}
