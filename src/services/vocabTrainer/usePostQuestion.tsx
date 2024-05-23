import { useToast } from '@/components/ui/use-toast';
import { TQuestion } from '@/pages/vocab-trainer/types';
import { useMutation } from 'react-query';
import { httpClient } from '../settings';
import { useNavigate } from 'react-router-dom';
import { TMutationConfig } from '@/utils/types';

const postQuestion = async (id: string) => {
  const { data } = await httpClient.get<TQuestion[]>(
    `/vocabTrainer/question/${id}`
  );
  return data;
};

export const usePostQuestion = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config?: TMutationConfig<typeof postQuestion>
) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => postQuestion(id),
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed, please try again',
      });
      navigate('/vocab-trainer');
    },
    ...config,
  });
};
