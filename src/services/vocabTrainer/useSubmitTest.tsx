import { useToast } from '@/components/ui/use-toast';
import { TFormInputsVocabTrainer } from '@/pages/vocab-trainer/types';
import { useMutation, useQueryClient } from 'react-query';
import { httpClient } from '../settings';
import { VOCAB_TRAINER_KEYS } from './queryKeys';

const submitTest = async (data: TFormInputsVocabTrainer) => {
  const res = await httpClient.post(`/vocabTrainer`, data);
  return res;
};

export const useSubmitTest = () => {
  const { toast } = useToast();
  const client = useQueryClient();

  return useMutation({
    mutationFn: (data: TFormInputsVocabTrainer) => submitTest(data),
    onSuccess: () => {
      client.invalidateQueries([VOCAB_TRAINER_KEYS.GET_VOCAB_TRAINER]);
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
