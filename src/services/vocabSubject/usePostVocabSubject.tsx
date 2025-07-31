import { useToast } from '@/components/ui/use-toast'
import { TVocabSubject } from '@/pages/settings/types'
import { useMutation, useQueryClient } from 'react-query'
import { httpClient } from '../settings'
import { VocabSubject } from '../endPoints'
import { VOCAB_SUBJECT_KEYS } from './queryKeys'

const postVocabSubject = async (data: Omit<TVocabSubject, 'id' | '_id'>) => {
  const res = await httpClient.post(VocabSubject.create, data)
  return res
}

export const usePostVocabSubject = () => {
  const { toast } = useToast()
  const client = useQueryClient()

  return useMutation({
    mutationFn: (data: Omit<TVocabSubject, 'id' | '_id'>) =>
      postVocabSubject(data),
    onSuccess: () => {
      client.invalidateQueries([VOCAB_SUBJECT_KEYS.GET_VOCAB_SUBJECT])
      toast({
        title: 'Success',
        description: 'Created successfully'
      })
    }
  })
}
