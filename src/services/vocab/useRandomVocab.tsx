import { useToast } from '@/components/ui/use-toast'
import { AxiosError } from 'axios'
import { useMutation, UseMutationOptions } from 'react-query'
import { ResponseAPI } from '../../utils/types'
import { httpClient } from '../settings'
import { TVocab } from '@/pages/vocab/types'

type RandomVocabResult = Awaited<ReturnType<typeof randomVocab>>

const randomVocab = async (params: number) => {
  const { data } = await httpClient.get<ResponseAPI<TVocab>>(
    `/vocab/random/${params.toString()}`
  )
  return data
}

export const useRandomVocab = (
  queryOptions?: UseMutationOptions<RandomVocabResult, AxiosError, number>
) => {
  const { toast } = useToast()

  return useMutation({
    mutationFn: randomVocab,
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed, please try again'
      })
    },
    ...queryOptions
  })
}
