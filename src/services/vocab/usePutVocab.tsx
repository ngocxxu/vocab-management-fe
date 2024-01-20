import { useMutation, useQueryClient } from 'react-query';
import { TVocab } from '../../pages/vocab';
import { httpClient } from '../settings';
import toast from 'react-hot-toast';
import { VOCAB_KEYS } from './queryKeys';

export type TPutVocabs = {
  data: Omit<TVocab, 'id'>;
  id: string;
};

const postVocab = async (item: TPutVocabs) => {
  const res = await httpClient.put(`/vocab/${item.id}`, item.data);
  return res;
};

export const usePutVocab = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (item: TPutVocabs) => postVocab(item),
    onSuccess: () => {
      client.invalidateQueries([VOCAB_KEYS.GET_VOCAB]);
      toast.success('Updated successfully');
    },
    onError: () => {
      toast.error('Failed, please try again');
    },
  });
};
