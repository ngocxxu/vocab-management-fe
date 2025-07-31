import { useToast } from '@/components/ui/use-toast'
import { TVocab } from '@/pages/vocab/types'
import { useMutation, useQueryClient } from 'react-query'
import { httpClient } from '../settings'
import { Vocab } from '../endPoints'
import { VOCAB_KEYS } from './queryKeys'

export type TPutVocabs = {
  data: Omit<TVocab, 'id'>
  id: string
}

const putVocab = async (item: TPutVocabs) => {
  const res = await httpClient.put(Vocab.update(item.id), item.data)
  return res
}

export const usePutVocab = () => {
  const { toast } = useToast()
  const client = useQueryClient()

  return useMutation({
    mutationFn: (item: TPutVocabs) => putVocab(item),
    onSuccess: () => {
      client.invalidateQueries([VOCAB_KEYS.GET_VOCAB])
      toast({
        title: 'Success',
        description: 'Updated successfully'
      })
    },
  })
}
