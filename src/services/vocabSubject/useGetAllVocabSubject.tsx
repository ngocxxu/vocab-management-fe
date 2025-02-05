import { TVocabSubject } from '@/pages/settings/types'
import { useQuery } from 'react-query'
import { ResponseAPI, TPage } from '../../utils/types'
import { httpClient } from '../settings'
import { VOCAB_SUBJECT_KEYS } from './queryKeys'

const getAllVocabSubject = async (pageOptions: TPage) => {
  const params = new URLSearchParams()

  Object.entries(pageOptions).forEach(([key, value]) => {
    if (typeof value === 'string') {
      if (value !== undefined) {
        params.append(`${key}`, value.toString())
      }
    } else if (value !== undefined && value.length > 0) {
      value.forEach((item) => {
        params.append(`${key}`, item)
      })
    }
  })

  const { data } = await httpClient.get<ResponseAPI<TVocabSubject[]>>(
    `/vocabSubject?${params.toString()}`
  )
  return data
}
export const useGetAllVocabSubject = (pageOptions: TPage) => {
  return useQuery({
    queryKey: [VOCAB_SUBJECT_KEYS.GET_VOCAB_SUBJECT, pageOptions],
    queryFn: () => getAllVocabSubject(pageOptions)
  })
}
