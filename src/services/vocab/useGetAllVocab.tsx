import { useQuery } from 'react-query';
import { TVocab } from '../../pages/vocab';
import { ResponseAPI, TPage } from '../../utils/types';
import { httpClient } from '../settings';
import { VOCAB_KEYS } from './queryKeys';

const getAllVocab = async (pageOptions: TPage) => {
  const { page, limit } = pageOptions;
  const { data } = await httpClient.get<ResponseAPI<TVocab>>(
    `/vocab?${new URLSearchParams({
      page,
      limit,
    })}`
  );
  return data;
};

export const useGetAllVocab = (pageOptions: TPage) => {
  return useQuery({
    queryKey: [VOCAB_KEYS.GET_VOCAB, pageOptions],
    queryFn: () => getAllVocab(pageOptions),
  });
};
