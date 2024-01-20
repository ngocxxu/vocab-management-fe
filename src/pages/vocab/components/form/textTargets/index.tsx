import { IconPlus, IconX } from '@tabler/icons-react';
import clsx from 'clsx';
import {
  Control,
  Controller,
  FieldError,
  FieldErrors,
  UseFormReset,
  UseFormSetValue,
  useFieldArray,
} from 'react-hook-form';
import { TFormInputsVocab } from '..';
import Input from '../../../../../components/input';
import Multiselect from '../../../../../components/multiselect';
import Select from '../../../../../components/select';
import { subjectList, wordTypeList } from '../../../constants';
import { ExamplesForm } from '../examples';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store';

type TTextTargetsForm = {
  isEditing: boolean;
  index: number;
  control: Control<TFormInputsVocab>;
  errors: FieldErrors<TFormInputsVocab>;
  setValue: UseFormSetValue<TFormInputsVocab>;
  reset: UseFormReset<TFormInputsVocab>;
};

export const TextTargetsForm = ({
  isEditing,
  index,
  control,
  errors,
  reset,
  setValue,
}: TTextTargetsForm) => {
  const { itemVocab } = useSelector((state: RootState) => state.vocabReducer);
  const { fields, append, remove } = useFieldArray({
    control,
    name: `textTarget.${index}.examples`,
  });
  const checkErrors = Object.keys(errors).length > 0;

  //Editing
  useEffect(() => {
    if (itemVocab && isEditing) {
      reset((prev) => ({ ...prev, ...itemVocab }));
      setValue(
        `textTarget.${index}.wordType`,
        itemVocab.textTarget[index].wordType
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing, itemVocab]);

  return (
    <>
      <div className='flex justify-center items-center gap-2'>
        <Controller
          name={`textTarget.${index}.text`}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              error={checkErrors ? errors.textTarget![index]?.text : null}
              isMark={true}
              label='Text target'
              placeholder='Type here'
              {...field}
            />
          )}
        />
        <Controller
          name={`textTarget.${index}.wordType`}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              error={errors.targetLanguage}
              isMark={true}
              label='Word type'
              options={wordTypeList}
              {...field}
            />
          )}
        />
      </div>
      <div className='flex justify-center items-center gap-2'>
        <Controller
          name={`textTarget.${index}.explanationSource`}
          control={control}
          render={({ field }) => (
            <Input
              label='Explanation source'
              placeholder='Type here'
              {...field}
            />
          )}
        />
        <Controller
          name={`textTarget.${index}.explanationTarget`}
          control={control}
          render={({ field }) => (
            <Input
              label='Explanation target'
              placeholder='Type here'
              {...field}
            />
          )}
        />
      </div>
      <div className='flex justify-center items-center gap-2'>
        <Controller
          name={`textTarget.${index}.grammar`}
          control={control}
          render={({ field }) => (
            <Input label='Grammar' placeholder='Type here' {...field} />
          )}
        />
        <Controller
          name={`textTarget.${index}.subject`}
          rules={{ required: true }}
          control={control}
          render={({ field }) => (
            <Multiselect
              error={
                checkErrors
                  ? (errors.textTarget![index]?.subject as FieldError)
                  : null
              }
              isMark={true}
              label='Subject'
              options={subjectList}
              {...field}
            />
          )}
        />
      </div>

      <div className='border border-gray-200 rounded-md mt-4 p-2'>
        {fields.map((field, idx) => (
          <fieldset key={field.id}>
            <div
              className={clsx(
                idx !== 0 && 'mt-4',
                'flex justify-between items-center'
              )}
            >
              <div className='text-sm'>Example {idx + 1}</div>
              <IconX
                onClick={() => remove(idx)}
                className='btn btn-square btn-xs btn-outline border-white bg-white'
              />
            </div>
            <ExamplesForm control={control} idx={idx} idxTextTarget={index} />
          </fieldset>
        ))}
        <button
          type='button'
          className={clsx(fields.length !== 0 && 'mt-2', 'btn btn-sm w-full')}
          onClick={() => {
            append({
              source: '',
              target: '',
            });
          }}
        >
          <IconPlus />
          Example
        </button>
      </div>
    </>
  );
};
