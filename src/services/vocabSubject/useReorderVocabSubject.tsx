import { useToast } from '@/components/ui/use-toast'
import { TReorderVocabSubject } from '@/pages/settings/types'
import { useMutation, useQueryClient } from 'react-query'
import { httpClient } from '../settings'
import { VocabSubject } from '../endPoints'
import { VOCAB_SUBJECT_KEYS } from './queryKeys'

type TReorderVocabSubjectPayload = {
  items: TReorderVocabSubject[]
}

const reorderVocabSubject = async (data: TReorderVocabSubjectPayload) => {
  const res = await httpClient.patch(VocabSubject.reorder, data)
  return res
}

export const useReorderVocabSubject = () => {
  const { toast } = useToast()
  const client = useQueryClient()

  return useMutation({
    mutationFn: (data: TReorderVocabSubjectPayload) =>
      reorderVocabSubject(data),
    onSuccess: () => {
      client.invalidateQueries([VOCAB_SUBJECT_KEYS.GET_VOCAB_SUBJECT])
      toast({
        title: 'Success',
        description: 'Reorder successfully'
      })
    }
  })
}
