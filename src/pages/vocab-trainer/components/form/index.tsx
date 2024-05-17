import Input from '@/components/input';
import Vocab from '@/pages/vocab';
import { RootState } from '@/redux/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import GroupButton from '../../../../components/button/GroupButton';
import { TFormInputsVocabTrainer } from '../../types';
import { useMemo } from 'react';
import { UseMutateFunction } from 'react-query';
import { AxiosResponse } from 'axios';

type TFormVocabTrainerProps = {
  idVocabTrainer: string;
  onClose: () => void;
  mutate: UseMutateFunction<AxiosResponse, unknown, TFormInputsVocabTrainer, unknown>;
};

const FormSchema = yup.object().shape({
  nameTest: yup.string().required('Name is required'),
});

const FormVocabTrainer = ({ mutate, onClose }: TFormVocabTrainerProps) => {
  const { rowSelectionState } = useSelector(
    (state: RootState) => state.vocabTrainerReducer
  );
  const counts = Object.keys(rowSelectionState).length;

  const mappedIds = useMemo(() => {
    return Object.entries(rowSelectionState).map(([key, value]) => {
      return value ? key : '';
    });
  }, [rowSelectionState]);

  const { handleSubmit, control, watch } = useForm<TFormInputsVocabTrainer>({
    defaultValues: {
      nameTest: '',
    },
    resolver: yupResolver(
      FormSchema
    ) as unknown as Resolver<TFormInputsVocabTrainer>,
  });

  const isDisabled = watch('nameTest').length === 0 || counts < 5;

  const onSubmit: SubmitHandler<TFormInputsVocabTrainer> = (data) => {
    mutate({ ...data, wordSelects: mappedIds });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name='nameTest'
        control={control}
        render={({ field }) => (
          <Input
            removeStyle
            isMark={true}
            label={<span className='text-sm font-semibold'>Name of test</span>}
            placeholder='Type here'
            {...field}
          />
        )}
      />

      <div className='text-sm font-semibold mt-5'>Vocabulary list</div>
      <Vocab />

      <div className='flex justify-center'>
        <GroupButton
          variantNo='ghost'
          onClose={onClose}
          disabledYes={isDisabled}
        />
      </div>
    </form>
  );
};

export default FormVocabTrainer;
