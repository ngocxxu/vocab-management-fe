import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { httpClient } from '../settings';
import { VOCAB_KEYS } from './queryKeys';

const deleteMultiVocab = async (ids: string[]) => {
  const { data } = await httpClient.post(`/vocab/deleteIds`, ids);
  return data;
};

export const useDeleteMultiVocab = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => deleteMultiVocab(ids),
    onSuccess: () => {
      client.invalidateQueries([VOCAB_KEYS.GET_VOCAB]);
      toast.success('Deleted all successfully');
    },
    onError: () => {
      toast.error('Failed, please try again');
    },
  });
};
