import { useQuery } from 'react-query';
import { httpClient } from '../settings';
import { VOCAB_KEYS } from './queryKeys';

const getAllVocab = async () => {
  const { data } = await httpClient.get(`/vocab`);
  return data;
};

export const useGetAllVocab = () => {
  return useQuery({
    queryKey: [VOCAB_KEYS.GET_VOCAB],
    queryFn: getAllVocab,
  });
};
