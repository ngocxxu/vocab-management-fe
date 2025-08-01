import { useQuery } from 'react-query'
import { ResponseAPI } from '../../utils/types'
import { httpClient } from '../settings'
import { WordType } from '../endPoints'
import { WORD_TYPE_KEYS } from './queryKeys'
import { TWordType } from './types'

const getAllWordTypes = async () => {
  const { data } = await httpClient.get<ResponseAPI<TWordType[]>>(
    WordType.getAll
  )
  return data
}

export const useGetAllWordTypes = () => {
  return useQuery({
    queryKey: [WORD_TYPE_KEYS.GET_WORD_TYPES],
    queryFn: () => getAllWordTypes()
  })
} 