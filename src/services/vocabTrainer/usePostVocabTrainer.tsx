import { useToast } from '@/components/ui/use-toast';
import { TFormInputsVocabTrainer } from '@/pages/vocab-trainer/types';
import { useMutation, useQueryClient } from 'react-query';
import { httpClient } from '../settings';
import { VOCAB_TRAINER_KEYS } from './queryKeys';

const postVocabTrainer = async (data: TFormInputsVocabTrainer) => {
  const res = await httpClient.post(`/vocabTrainer`, data);
  return res;
};

export const usePostVocabTrainer = () => {
  const { toast } = useToast();
  const client = useQueryClient();

  return useMutation({
    mutationFn: (data: TFormInputsVocabTrainer) => postVocabTrainer(data),
    onSuccess: () => {
      client.invalidateQueries([VOCAB_TRAINER_KEYS.GET_ALL_VOCAB_TRAINER]);
      toast({
        title: 'Success',
        description: 'Created successfully',
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
