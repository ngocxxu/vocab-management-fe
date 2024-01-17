import { useMutation, useQueryClient } from 'react-query';
import { TVocab } from '../../pages/vocab';
import { httpClient } from '../settings';
import toast from 'react-hot-toast';
import { VOCAB_KEYS } from './queryKeys';

const postVocab = async (data: Omit<TVocab, 'id'>) => {
  const res = await httpClient.post(`/vocab`, data);
  return res;
};

export const usePostVocab = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<TVocab, 'id'>) => postVocab(data),
    onSuccess: () => {
      client.invalidateQueries([VOCAB_KEYS.GET_VOCAB]);
      toast.success('Created successfully');
    },
    onError: () => {
      toast.error('Failed, please try again');
    },
  });
};
