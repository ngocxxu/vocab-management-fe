import { TVocabSubject } from '@/pages/settings/types'
import { useQuery } from 'react-query'
import { ResponseAPI } from '../../utils/types'
import { httpClient } from '../settings'
import { VocabSubject } from '../endPoints'
import { VOCAB_SUBJECT_KEYS } from './queryKeys'

const getAllVocabSubject = async () => {
  const { data } =
    await httpClient.get<ResponseAPI<TVocabSubject[]>>(VocabSubject.getAll)
  return data
}
export const useGetAllVocabSubject = () => {
  return useQuery({
    queryKey: [VOCAB_SUBJECT_KEYS.GET_VOCAB_SUBJECT],
    queryFn: () => getAllVocabSubject()
  })
}
