import Button from '@/components/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { yupResolver } from '@hookform/resolvers/yup'
import { IconPlus, IconX } from '@tabler/icons-react'
import { AxiosResponse } from 'axios'
import {
  Controller,
  Resolver,
  SubmitHandler,
  useFieldArray,
  useForm
} from 'react-hook-form'
import { UseMutateFunction } from 'react-query'
import { useSelector } from 'react-redux'
import * as yup from 'yup'
import GroupButton from '../../../../components/button/GroupButton'
import Input from '../../../../components/input'
import Select from '../../../../components/select'
import { RootState } from '../../../../redux/store'
import { TPutVocabs } from '../../../../services/vocab/usePutVocab'
import { defaultValue, languageList } from '../../constants'
import { TTextTarget, TVocab } from '../../types'
import { TextTargetsForm } from './textTargets'

type TFormVocabProps = {
  idVocab: string
  isEditing: boolean
  onClose: () => void
  mutate: UseMutateFunction<AxiosResponse, unknown, Omit<TVocab, 'id'>, unknown>
  mutatePut: UseMutateFunction<AxiosResponse, unknown, TPutVocabs, unknown>
}

export type TFormInputsVocab = {
  sourceLanguage: string
  targetLanguage: string
  textSource: string
  textTarget: TTextTarget[]
}

const FormSchema = yup.object().shape({
  sourceLanguage: yup.string().required('Source language is required'),
  targetLanguage: yup.string().required('Target language is required'),
  textSource: yup.string().required('Text source is required'),
  textTarget: yup.array().of(
    yup.object().shape({
      text: yup.string().required('Text is required'),
      wordType: yup.string().required('Word type is required'),
      subject: yup.array().min(1)
    })
  )
})

const FormVocab = ({
  idVocab,
  isEditing,
  onClose,
  mutate,
  mutatePut
}: TFormVocabProps) => {
  const { itemVocab } = useSelector((state: RootState) => state.vocabReducer)
  const {
    setValue,
    reset,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<TFormInputsVocab>({
    defaultValues: {
      sourceLanguage: 'ko',
      targetLanguage: 'vi',
      ['textTarget']:
        itemVocab && isEditing ?
          Array.from(itemVocab.textTarget, () => defaultValue)
        : [defaultValue]
    },
    resolver: yupResolver(FormSchema) as unknown as Resolver<TFormInputsVocab>
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'textTarget'
  })

  const onSubmit: SubmitHandler<TFormInputsVocab> = (data) => {
    isEditing ?
      mutatePut({
        data: data as Omit<TVocab, 'id'>,
        id: idVocab
      })
    : mutate(data as Omit<TVocab, 'id'>)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-center gap-2">
        <Controller
          name="sourceLanguage"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              error={errors.sourceLanguage}
              isMark={true}
              label="Source language"
              options={languageList}
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />
        <Controller
          name="targetLanguage"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              error={errors.targetLanguage}
              isMark={true}
              label="Target language"
              options={languageList}
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />
      </div>
      <Controller
        name="textSource"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Input
            error={errors.textSource}
            isMark={true}
            label="Text source"
            placeholder="Type here"
            {...field}
          />
        )}
      />

      <ScrollArea className="h-[440px]">
        {fields.map((field, index) => (
          <fieldset
            className="mt-4 rounded-md border border-gray-200 p-2"
            key={field.id}
          >
            <div className="flex items-center justify-between font-semibold">
              <div className="text-sm">Item {index + 1}</div>
              {index > 0 && (
                <IconX
                  onClick={() => remove(index)}
                  className="cursor-pointer"
                />
              )}
            </div>
            <TextTargetsForm
              fieldsLengthItem={fields.length}
              isEditing={isEditing}
              setValue={setValue}
              reset={reset}
              errors={errors}
              control={control}
              index={index}
            />
          </fieldset>
        ))}
      </ScrollArea>

      <Button
        className="mt-4 w-full"
        variant="outline"
        type="button"
        onClick={() => {
          append({
            ...defaultValue,
            examples: []
          })
        }}
        leftIcon={<IconPlus className="mr-1" />}
      />

      <div className="mt-4 flex justify-end">
        <GroupButton
          variantNo="ghost"
          isEditing={isEditing}
          onClose={onClose}
        />
      </div>
    </form>
  )
}

export default FormVocab
