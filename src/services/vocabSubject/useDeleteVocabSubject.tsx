import { useToast } from '@/components/ui/use-toast'
import { useMutation, useQueryClient } from 'react-query'
import { httpClient } from '../settings'
import { VOCAB_SUBJECT_KEYS } from './queryKeys'

const deleteVocabSubject = async (id: string) => {
  const { data } = await httpClient.delete(`/vocabSubject/${id}`)
  return data
}

export const useDeleteVocabSubject = () => {
  const { toast } = useToast()
  const client = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteVocabSubject(id),
    onSuccess: () => {
      client.invalidateQueries([VOCAB_SUBJECT_KEYS.GET_VOCAB_SUBJECT])
      toast({
        title: 'Success',
        description: 'Deleted successfully'
      })
    },
  })
}
