import { useToast } from '@/components/ui/use-toast'
import { useMutation, useQueryClient } from 'react-query'
import { httpClient } from '../settings'
import { VOCAB_SUBJECT_KEYS } from './queryKeys'

export type TPutVocabSubjects = {
  data: {
    name: string
  }
  id: string
}

const putVocabSubject = async (item: TPutVocabSubjects) => {
  const res = await httpClient.put(`/vocabSubject/${item.id}`, item.data)
  return res
}

export const usePutVocabSubject = () => {
  const { toast } = useToast()
  const client = useQueryClient()

  return useMutation({
    mutationFn: (item: TPutVocabSubjects) => putVocabSubject(item),
    onSuccess: () => {
      client.invalidateQueries([VOCAB_SUBJECT_KEYS.GET_VOCAB_SUBJECT])
      toast({
        title: 'Success',
        description: 'Updated successfully'
      })
    }
  })
}
