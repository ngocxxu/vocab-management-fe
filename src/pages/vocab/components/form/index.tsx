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
      textTarget: yup.string().required('Text target is required'),
      wordType: yup.string(),
      textTargetSubjects: yup.array().min(1)
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

  const defaultValues = useMemo(() => {
    if (itemVocab && isEditing) {
      return {
        sourceLanguage: itemVocab.sourceLanguageCode || 'ko',
        targetLanguage: itemVocab.targetLanguageCode || 'vi',
        textSource: itemVocab.textSource || '',
        textTarget: itemVocab.textTargets || [defaultValue]
      }
    }
    return {
      sourceLanguage: 'ko',
      targetLanguage: 'vi',
      textSource: '',
      textTarget: [defaultValue]
    }
  }, [itemVocab, isEditing])

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<TFormInputsVocab>({
    defaultValues,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fields, errors, isEditing, items, control]
  )

  const onSubmit: SubmitHandler<TFormInputsVocab> = (data) => {
    isEditing ?
      mutatePut({
        data: data as unknown as Omit<TVocab, 'id'>,
        id: idVocab
      })
    : mutate(data as unknown as Omit<TVocab, 'id'>)
    onClose()
  }

  // Reset form khi itemVocab thay đổi (nếu cần)
  useEffect(() => {
    if (itemVocab && isEditing) {
      reset({
        sourceLanguage: itemVocab.sourceLanguageCode   || 'ko',
        targetLanguage: itemVocab.targetLanguageCode || 'vi',
        textSource: itemVocab.textSource || '',
        textTarget: itemVocab.textTargets || [defaultValue]
      })
    }
  }, [itemVocab, isEditing, reset])

  useEffect(() => {
    if (dataVocabSubject && dataVocabSubject?.items.length > 0) {
      const newData = dataVocabSubject.items.map((item) => ({
        value: item._id,
        label: item.name
      }))

      setItems((prevItems) => {
        if (JSON.stringify(prevItems) !== JSON.stringify(newData)) {
          return newData
        }
        return prevItems
      })
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
                vocabExamples: []
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
