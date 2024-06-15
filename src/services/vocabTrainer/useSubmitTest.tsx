import { useToast } from '@/components/ui/use-toast'
import { TFormTestVocabTrainer } from '@/pages/vocab-trainer/types'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { httpClient } from '../settings'

const submitTest = async ({ id, ...data }: TFormTestVocabTrainer) => {
  const res = await httpClient.patch(`/vocabTrainer/test/${id}`, data)
  return res
}

export const useSubmitTest = () => {
  const navigate = useNavigate()
  const { toast } = useToast()

  return useMutation({
    mutationFn: (data: TFormTestVocabTrainer) => submitTest(data),
    onSuccess: () => {
      navigate('/vocab-trainer/examination/result')
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed, please try again'
      })
      navigate('/vocab-trainer')
    }
  })
}
