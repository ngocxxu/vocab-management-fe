import { useQuery } from 'react-query';
import { httpClient } from '../settings';
import { VOCAB_KEYS } from './queryKeys';
import { TVocab } from '../../pages/vocab';

const getAllVocab = async () => {
  const { data } = await httpClient.get<TVocab[]>(`/vocab`);
  return data;
};

export const useGetAllVocab = () => {
  return useQuery({
    queryKey: [VOCAB_KEYS.GET_VOCAB],
    queryFn: getAllVocab,
  });
};
