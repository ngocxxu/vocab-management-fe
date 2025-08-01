import { useToast } from '@/components/ui/use-toast'
import { useMutation, useQueryClient } from 'react-query'
import { httpClient } from '../settings'
import { WordType } from '../endPoints'
import { WORD_TYPE_KEYS } from './queryKeys'
import { TCreateWordType } from './types'

const postWordType = async (data: TCreateWordType) => {
  const res = await httpClient.post(WordType.create, data)
  return res
}

export const usePostWordType = () => {
  const { toast } = useToast()
  const client = useQueryClient()

  return useMutation({
    mutationFn: (data: TCreateWordType) => postWordType(data),
    onSuccess: () => {
      client.invalidateQueries([WORD_TYPE_KEYS.GET_WORD_TYPES])
      toast({
        title: 'Success',
        description: 'Word type created successfully'
      })
    },
  })
} 