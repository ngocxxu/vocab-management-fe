import { useToast } from '@/components/ui/use-toast'
import { TVocab } from '@/pages/vocab/types'
import { useMutation, useQueryClient } from 'react-query'
import { httpClient } from '../settings'
import { VOCAB_KEYS } from './queryKeys'

const postMultiVocab = async (data: Omit<TVocab, 'id'>[]) => {
  const res = await httpClient.post(`/vocab/bulk`, data)
  return res
}

export const usePostMultiVocab = () => {
  const { toast } = useToast()
  const client = useQueryClient()

  return useMutation({
    mutationFn: (data: Omit<TVocab, 'id'>[]) => postMultiVocab(data),
    onSuccess: () => {
      client.invalidateQueries([VOCAB_KEYS.GET_VOCAB])
      toast({
        title: 'Success',
        description: 'Created successfully'
      })
    }
  })
}
