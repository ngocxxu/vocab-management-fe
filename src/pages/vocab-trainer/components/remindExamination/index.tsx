import { Loader } from '@/components/loader'
import { usePostQuestion } from '@/services/vocabTrainer/usePostQuestion'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

 const RemindExamination = () => {
  const { id = '' } = useParams()
  const { mutate: mutateQuestion, isLoading } = usePostQuestion()

  useEffect(() => {
    mutateQuestion(id)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return isLoading ? <Loader /> : null
}

export default RemindExamination