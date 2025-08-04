import { useToast } from '@/components/ui/use-toast'
import { TCreateVocab } from '@/pages/vocab/types'
import { useMutation, useQueryClient } from 'react-query'
import { Vocab } from '../endPoints'
import { httpClient } from '../settings'
import { VOCAB_KEYS } from './queryKeys'

const postMultiVocab = async (data: TCreateVocab[]) => {
  const res = await httpClient.post(Vocab.bulkCreate, data)
  return res
}

export const usePostMultiVocab = () => {
  const { toast } = useToast()
  const client = useQueryClient()

  return useMutation({
    mutationFn: (data: TCreateVocab[]) => postMultiVocab(data),
    onSuccess: () => {
      client.invalidateQueries([VOCAB_KEYS.GET_VOCAB])
      toast({ title: 'Success', description: 'Created successfully' })
    }
  })
}
