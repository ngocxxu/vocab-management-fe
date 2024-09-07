import { defaultOnError } from '@/main'
import { TQuestion } from '@/pages/vocab-trainer/types'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { httpClient } from '../settings'

const postQuestion = async (id: string) => {
  const { data } = await httpClient.get<TQuestion>(
    `/vocabTrainer/question/${id}`
  )
  return data
}

export const usePostQuestion = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: postQuestion,
    onSuccess: (data, id) => {
      localStorage.setItem('examId', id)
      localStorage.setItem('questionnaire', JSON.stringify(data))
      navigate('/vocab-trainer/examination')
    },
    onError: (err: AxiosError) => {
      defaultOnError(err)
      navigate('/vocab-trainer')
    }
  })
}
