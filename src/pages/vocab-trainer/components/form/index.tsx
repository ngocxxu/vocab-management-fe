import Input from '@/components/input'
import Vocab from '@/pages/vocab'
import { RootState } from '@/redux/store'
import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosResponse } from 'axios'
import { useCallback, useEffect, useMemo } from 'react'
import { Controller, Resolver, SubmitHandler, useForm } from 'react-hook-form'
import { UseMutateFunction } from 'react-query'
import { useSelector } from 'react-redux'
import * as yup from 'yup'
import GroupButton from '../../../../components/button/GroupButton'
import {
  DEFAULT_COUNTTIME_MINS,
  DEFAULT_SECOND,
  MINIMUM_WORD
} from '../../constants'
import { TCreateVocabTrainer } from '../../types'
import { EQuestionType, EVocabTrainerStatus } from '../../enum'

type TFormVocabTrainerProps = {
  idVocabTrainer: string
  onClose: () => void
  mutate: UseMutateFunction<
    AxiosResponse,
    unknown,
    TCreateVocabTrainer,
    unknown
  >
  isLoading: boolean
}

const FormSchema = yup
  .object()
  .shape({
    name: yup.string().required('Name is required'),
    setCountTime: yup.number().required('Countdown is required')
  })

const FormVocabTrainer = ({
  mutate,
  onClose,
  isLoading
}: TFormVocabTrainerProps) => {
  const { rowSelectionState } = useSelector(
    (state: RootState) => state.vocabTrainerReducer
  )
  const counts = Object.keys(rowSelectionState).length

  const mappedIds = useMemo(() => {
    return Object.entries(rowSelectionState).map(([key, value]) => {
      return value ? key : ''
    })
  }, [rowSelectionState])

  const { handleSubmit, control, watch, setValue } =
    useForm<TCreateVocabTrainer>({
      defaultValues: { name: '', setCountTime: DEFAULT_COUNTTIME_MINS },
      resolver: yupResolver(
        FormSchema
      ) as unknown as Resolver<TCreateVocabTrainer>
    })

  const isDisabled =
    watch('name').length === 0 || counts < MINIMUM_WORD || isLoading

  const onSubmit: SubmitHandler<TCreateVocabTrainer> = (formData) => {
    mutate({
      name: formData.name,
      status: EVocabTrainerStatus.PENDING,
      questionType: EQuestionType.MULTIPLE_CHOICE,
      reminderTime: 0,
      countTime: 0,
      setCountTime: formData.setCountTime * DEFAULT_SECOND,
      reminderDisabled: true,
      reminderRepeat: 2,
      reminderLastRemind: new Date().toISOString(),
      vocabAssignmentIds: mappedIds
    })
  }

  const handleCountTime = useCallback(() => {
    setValue('setCountTime', DEFAULT_COUNTTIME_MINS)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    handleCountTime()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelectionState])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-2">
        <div className="flex-1">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                removeStyle
                isMark={true}
                label={
                  <span className="text-sm font-semibold">Name of test</span>
                }
                placeholder="Type here"
                {...field}
              />
            )}
          />
        </div>

        <div>
          <Controller
            name="setCountTime"
            control={control}
            render={({ field }) => (
              <Input
                removeStyle
                isMark={true}
                label={
                  <span className="text-sm font-semibold">
                    Set countdown <span className="text-xs">(minute unit)</span>
                  </span>
                }
                type="number"
                step={5}
                min={5}
                max={100}
                {...field}
              />
            )}
          />
        </div>
      </div>

      <Vocab />

      <div className="flex justify-center">
        <GroupButton
          variantNo="ghost"
          onClose={onClose}
          disabledYes={isDisabled}
          disabledNo={isLoading}
        />
      </div>
    </form>
  )
}

export default FormVocabTrainer
