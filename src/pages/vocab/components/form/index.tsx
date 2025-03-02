import { Tabs } from '@/components/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { useGetAllVocabSubject } from '@/services/vocabSubject/useGetAllVocabSubject'
import { TOption } from '@/utils/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { IconPlus } from '@tabler/icons-react'
import { AxiosResponse } from 'axios'
import { X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
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
  const [items, setItems] = useState<TOption[]>([])
  const [orderTab, setOrderTab] = useState(String(0))
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
  const { data: dataVocabSubject } = useGetAllVocabSubject()

  const headTabs = useMemo(
    () =>
      fields.map((_, idx) => ({
        content: <div className="flex items-center gap-1">Vocab {idx + 1}</div>,
        value: String(idx)
      })),
    [fields]
  )

  const bodyTabs = useMemo(
    () =>
      fields.map((field, index) => ({
        content: (
          <ScrollArea className="h-[440px]">
            <fieldset
              className="rounded-md border border-gray-200 p-2"
              key={field.id}
            >
              <TextTargetsForm
                fieldsLengthItem={fields.length}
                isEditing={isEditing}
                setValue={setValue}
                reset={reset}
                errors={errors}
                control={control}
                index={index}
                subjects={items}
              />
            </fieldset>
          </ScrollArea>
        ),
        value: String(index)
      })),
    [control, errors, fields, isEditing, reset, setValue, items]
  )

  const onSubmit: SubmitHandler<TFormInputsVocab> = (data) => {
    isEditing ?
      mutatePut({
        data: data as Omit<TVocab, 'id'>,
        id: idVocab
      })
    : mutate(data as Omit<TVocab, 'id'>)
    onClose()
  }

  useEffect(() => {
    if (dataVocabSubject && dataVocabSubject?.data.length > 0) {
      const newData = dataVocabSubject.data.map((item) => ({
        value: item._id,
        label: item.name
      }))
      setItems(newData)
    }
  }, [dataVocabSubject])

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

      <Tabs
        removeItemTab={(idx) => (
          <X
            onClick={() => {
              if (
                (idx === fields.length - 1 &&
                  Number(orderTab) === fields.length - 1) ||
                (idx !== fields.length - 1 &&
                  Number(orderTab) === fields.length - 1)
              ) {
                setOrderTab(String(Number(orderTab) - 1))
              }
              remove(idx)
            }}
            className="h-3.5 w-3.5 cursor-pointer"
            strokeWidth={4}
          />
        )}
        value={orderTab}
        onValueChange={(e) => setOrderTab(e)}
        className="mt-6"
        classNameHeader={cn(
          'cursor-default',
          Number(orderTab) !== 0 && 'rounded-br-none rounded-tr-none'
        )}
        head={headTabs}
        body={bodyTabs}
        extraHeader={
          <IconPlus
            className="h-5 w-5 cursor-pointer rounded-full border"
            onClick={() => {
              append({
                ...defaultValue,
                examples: []
              })
            }}
          />
        }
      />

      <div className="flex justify-center">
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
