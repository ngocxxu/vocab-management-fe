import { useToast } from '@/components/ui/use-toast';
import { TQuestion } from '@/pages/vocab-trainer/types';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { httpClient } from '../settings';

const postQuestion = async (id: string) => {
  const { data } = await httpClient.get<TQuestion[]>(
    `/vocabTrainer/question/${id}`
  );
  return data;
};

export const usePostQuestion = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => postQuestion(id),
    onSuccess: (data) => {
      localStorage.setItem('questions', JSON.stringify(data));
      navigate('/vocab-trainer/examination');
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed, please try again',
      });
      navigate('/vocab-trainer');
    },
  });
};
