import IconFilter from '@/assets/svg/IconFilter';
import Button from '@/components/button';
import { Modal } from '@/components/modal/index';
import { Popover } from '@/components/popover';
import { SearchBar } from '@/components/searchBar';
import { ButtonLib } from '@/components/ui/button';
import {
  resetFilterState,
  setFilterVocabState,
  setSearchVocabState,
} from '@/redux/reducer/vocab';
import { RootState } from '@/redux/store';
import { TPutVocabs } from '@/services/vocab/usePutVocab';
import { TOption } from '@/utils/types';
import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { UseMutateFunction } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { TVocab } from '../../types';
import { Filter } from '../filter';
import FormVocab from '../form';
import IconFilterRemove from '@/assets/svg/IconFilterRemove';
import { defaultStatus } from '@/utils/constants';

type TToolbar = {
  onAddNew: () => void;
  idVocab: string;
  mutatePost: UseMutateFunction<
    AxiosResponse,
    unknown,
    Omit<TVocab, 'id'>,
    unknown
  >;
  mutatePut: UseMutateFunction<AxiosResponse, unknown, TPutVocabs, unknown>;
  isEditing: boolean;
};

export type TFormInputsFilter = {
  status?: string[];
  subject?: TOption[];
};

export const ToolBar = ({
  onAddNew,
  mutatePost,
  idVocab,
  mutatePut,
  isEditing,
}: TToolbar) => {
  const { filterData, searchVocab } = useSelector(
    (state: RootState) => state.vocabReducer
  );
  const isClear =
    searchVocab ||
    // (filterData.status && filterData.status?.length > 0) ||
    (filterData.subject && filterData.subject?.length > 0);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const methods = useForm<TFormInputsFilter>({
    defaultValues: {
      subject: filterData.subject,
      status: filterData.status,
    },
  });

  const onSubmit: SubmitHandler<TFormInputsFilter> = (data) => {
    dispatch(setFilterVocabState(data));
    setOpen(false);
  };

  return (
    <div className='flex items-center justify-end'>
      <FormProvider {...methods}>
        {isClear && (
          <ButtonLib
            variant='outline'
            onClick={() => {
              dispatch(resetFilterState());
              methods.setValue('subject', []);
              methods.setValue('status', defaultStatus);
            }}
          >
            <IconFilterRemove /> Clear all
          </ButtonLib>
        )}
        <Popover
          open={open}
          onOpenChange={setOpen}
          align='end'
          side='bottom'
          head={
            <ButtonLib className='mx-1' variant='ghost'>
              <IconFilter /> Filters
            </ButtonLib>
          }
          body={
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <Filter onClose={() => setOpen(false)} />
            </form>
          }
          className='w-80'
        />
      </FormProvider>
      <SearchBar
        defaultValue={searchVocab}
        onSearch={(input) => dispatch(setSearchVocabState(input))}
      />

      <Modal
        title={isEditing ? 'Edit' : 'Create'}
        open={openModal}
        onOpenChange={setOpenModal}
        head={
          <Button
            type='button'
            classNames='ml-3'
            title='+ Add new'
            onClick={onAddNew}
          />
        }
        body={
          <FormVocab
            idVocab={idVocab}
            mutate={mutatePost}
            mutatePut={mutatePut}
            isEditing={isEditing}
            onClose={() => setOpenModal(false)}
          />
        }
        className='w-full h-full max-w-[100vh] !max-h-[85vh] overflow-x-auto'
      />
    </div>
  );
};
