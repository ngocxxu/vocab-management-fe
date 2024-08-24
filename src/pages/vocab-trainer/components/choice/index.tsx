import Button from '@/components/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { setOrderQuestion } from '@/redux/reducer/vocabTrainer'
import { RootState } from '@/redux/store'
import { AxiosResponse } from 'axios'
import { useEffect } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { UseMutateFunction } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { EVocabTrainerType } from '../../enum'
import { TFormTestVocabTrainer, TQuestionAPI } from '../../types'

type TFormChoice = { wordTestSelects: { idWord: string }[] }

type TChoiceProps = {
  mutateQuestion: UseMutateFunction<
    AxiosResponse,
    unknown,
    TFormTestVocabTrainer,
    unknown
  >
  countdown: number
  data: TQuestionAPI
  setCountQuestions: React.Dispatch<React.SetStateAction<number>>
}

export const Choice = ({
  data,
  countdown,
  mutateQuestion,
  setCountQuestions
}: TChoiceProps) => {
  const { questions, setCountTime } = data
  const dispatch = useDispatch()
  const form = useForm<TFormChoice>({
    defaultValues: {
      wordTestSelects: [{ idWord: '' }]
    }
  })
  const { orderQuestion } = useSelector(
    (state: RootState) => state.vocabTrainerReducer
  )

  const { fields, append } = useFieldArray({
    control: form.control,
    name: 'wordTestSelects'
  })

  const onSubmit: SubmitHandler<TFormChoice> = (formData) => {
    const newArr = formData.wordTestSelects.map((item, index) => ({
      ...item,

      userSelect: questions?.[index].options.find(
        (item2) => item2.value === item.idWord
      )?.label,
      type:
        questions?.[index].type === EVocabTrainerType.SOURCE ?
          EVocabTrainerType.SOURCE
        : EVocabTrainerType.TARGET,
      randomOrder: questions?.[index].randomOrder
    }))

    mutateQuestion({
      id: localStorage.getItem('examId') ?? '',
      duration: setCountTime - countdown,
      wordTestSelects: newArr
    })
  }

  useEffect(() => {
    setCountQuestions(form.watch().wordTestSelects.length)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch().wordTestSelects.length])

  return (
    <div className="rounded-md border-t bg-primary-foreground p-4 shadow-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {fields.map(
            (field, index) =>
              orderQuestion === index + 1 && (
                <fieldset key={field.id}>
                  <p className="font-semibold">Question</p>
                  <div className="mb-5 mt-3 rounded-md bg-popover p-3 text-sm font-medium">
                    Please choose the meaning of the word{' '}
                    <span className="ml-1 rounded bg-primary p-1 font-bold text-white">
                      {questions[index].content.join(', ')}
                    </span>
                  </div>
                  <p className="mb-3 font-semibold">Choice</p>
                  <FormField
                    control={form.control}
                    name={`wordTestSelects.${index}.idWord`}
                    render={({ field }) => (
                      <FormItem className="mb-8 space-y-3">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            className="flex flex-col space-y-1"
                            {...field}
                          >
                            {questions[index].options.map((item) => {
                              return (
                                <FormItem
                                  key={item.value}
                                  className="flex items-center space-x-3 space-y-0 rounded-md bg-popover px-3"
                                >
                                  <FormControl>
                                    <RadioGroupItem value={item.value} />
                                  </FormControl>
                                  <FormLabel className="w-full py-3 font-medium">
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            })}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </fieldset>
              )
          )}

          <div className="mt-4 flex w-full items-center justify-center gap-2">
            <Button
              type="button"
              disabled={orderQuestion === 1}
              variant="ghost"
              title="Previous"
              onClick={() => {
                dispatch(setOrderQuestion(orderQuestion - 1))
              }}
            />
            {orderQuestion === questions.length ?
              <Button
                disabled={
                  !form.watch(`wordTestSelects.${orderQuestion - 1}.idWord`)
                }
                type="submit"
                title="Submit"
              />
            : <Button
                type="button"
                disabled={
                  !form.watch(`wordTestSelects.${orderQuestion - 1}.idWord`)
                }
                title="Next"
                onClick={() => {
                  append({ idWord: '' })
                  dispatch(setOrderQuestion(orderQuestion + 1))
                }}
              />
            }
          </div>
        </form>
      </Form>
    </div>
  )
}
