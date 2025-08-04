import { TVocab } from '@/pages/vocab/types'
import { useQuery } from 'react-query'
import { ResponseAPI, TVocabQuery } from '../../utils/types'
import { Vocab } from '../endPoints'
import { httpClient } from '../settings'
import { VOCAB_KEYS } from './queryKeys'

const getAllVocab = async (pageOptions: TVocabQuery) => {
  const params = new URLSearchParams()

  Object.entries(pageOptions).map(([key, value]) => {
    if (typeof value === 'string') {
      if (value !== undefined) {
        params.append(`${key}`, value.toString())
      }
    } else {
      if (value !== undefined && (value as string[]).length > 0) {
        (value as string[]).forEach(item => {
          params.append(`${key}`, item)
        })
      }
    }
  })

  const { data } = await httpClient.get<ResponseAPI<TVocab[]>>(
    `${Vocab.getAll}?${params.toString()}`
  )
  return data
}

export const useGetAllVocab = (pageOptions: TVocabQuery) => {
  return useQuery({
    queryKey: [VOCAB_KEYS.GET_VOCAB, pageOptions],
    queryFn: () => getAllVocab(pageOptions)
  })
}
