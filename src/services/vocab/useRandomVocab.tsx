import { TVocab } from '@/pages/vocab/types'
import { AxiosError } from 'axios'
import { useMutation, UseMutationOptions } from 'react-query'
import { ResponseAPI } from '../../utils/types'
import { httpClient } from '../settings'

type RandomVocabResult = Awaited<ReturnType<typeof randomVocab>>

const randomVocab = async (params: number) => {
  const { data } = await httpClient.get<ResponseAPI<TVocab[]>>(
    `/vocab/random/${params.toString()}`
  )
  return data
}

export const useRandomVocab = (
  queryOptions?: UseMutationOptions<RandomVocabResult, AxiosError, number>
) => {
  return useMutation({
    mutationFn: randomVocab,
    ...queryOptions
  })
}
