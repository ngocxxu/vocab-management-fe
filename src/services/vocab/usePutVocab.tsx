import { useToast } from '@/components/ui/use-toast'
import { TCreateVocab } from '@/pages/vocab/types'
import { useMutation, useQueryClient } from 'react-query'
import { Vocab } from '../endPoints'
import { httpClient } from '../settings'
import { VOCAB_KEYS } from './queryKeys'

export type TPutVocabs = { data: TCreateVocab; id: string }

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
      toast({ title: 'Success', description: 'Updated successfully' })
    }
  })
}
