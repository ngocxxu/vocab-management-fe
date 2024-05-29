import { useMutation, useQueryClient } from 'react-query';
import { httpClient } from '../settings';
import { VOCAB_TRAINER_KEYS } from './queryKeys';
import { useToast } from '@/components/ui/use-toast';

const deleteMultiVocabTrainer = async (ids: string[]) => {
  const { data } = await httpClient.post(`/vocabTrainer/deleteIds`, ids);
  return data;
};

export const useDeleteMultiVocabTrainer = () => {
  const { toast } = useToast();
  const client = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => deleteMultiVocabTrainer(ids),
    onSuccess: () => {
      client.invalidateQueries([VOCAB_TRAINER_KEYS.GET_ALL_VOCAB_TRAINER]);
      toast({
        title: 'Success',
        description: 'Deleted all successfully',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed, please try again',
      });
    },
  });
};
