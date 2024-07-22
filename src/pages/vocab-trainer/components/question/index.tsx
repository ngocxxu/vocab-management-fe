import Button from '@/components/button'
import { Loader } from '@/components/loader'
import { setOrderQuestion } from '@/redux/reducer/vocabTrainer'
import { RootState } from '@/redux/store'
import { useSubmitTest } from '@/services/vocabTrainer/useSubmitTest'
import { DEFAULT_COUNTDOWN } from '@/utils/constants'
import { ChevronLeft, ChevronRight, Circle, Clock } from 'lucide-react'
import { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { TQuestionAPI } from '../../types'
import { Choice } from '../choice'
import { Countdown } from '../countDown'

const Question = memo(() => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { orderQuestion } = useSelector(
    (state: RootState) => state.vocabTrainerReducer
  )
  const [countQuestions, setCountQuestions] = useState(1)
  const [data, setData] = useState<TQuestionAPI>({
    setCountTime: DEFAULT_COUNTDOWN,
    questions: []
  })
  const [countdown, setCountdown] = useState(data.setCountTime)
  const { mutate, isLoading } = useSubmitTest()

  useEffect(() => {
    const storedData = localStorage.getItem('questionnaire')
    if (storedData) {
      setData(JSON.parse(storedData))
    } else {
      navigate('/vocab-trainer')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setCountdown(data.setCountTime)
  }, [data.setCountTime])

  useEffect(() => {
    return () => {
      dispatch(setOrderQuestion(1))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!data || !data.questions || data.questions.length <= 0) {
    return null
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="container grid grid-cols-5 gap-4">
      <div className="col-span-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-1">
            <Button
              type="button"
              disabled={orderQuestion === 1}
              variant="ghost"
              size="icon"
              leftIcon={<ChevronLeft />}
              onClick={() => {
                dispatch(setOrderQuestion(orderQuestion - 1))
              }}
            />
            <div className="mx-auto rounded-md border bg-primary-foreground p-2 font-semibold">
              {`Question ${orderQuestion}/${data.questions.length}`}
            </div>
            <Button
              type="button"
              disabled={countQuestions <= orderQuestion}
              variant="ghost"
              size="icon"
              leftIcon={<ChevronRight />}
              onClick={() => {
                dispatch(setOrderQuestion(orderQuestion + 1))
              }}
            />
          </div>
          <div className="flex gap-2 rounded-md border bg-primary-foreground p-2 font-semibold">
            <Clock />
            <Countdown countdown={countdown} setCountdown={setCountdown} />
          </div>
        </div>
        <Choice
          mutateQuestion={mutate}
          data={data}
          countdown={countdown}
          setCountQuestions={setCountQuestions}
        />
      </div>

      <div className="rounded-md border-t bg-primary-foreground p-4 font-semibold shadow-md">
        Question list
        <div className="mt-3 rounded-md bg-popover p-4">
          {data &&
            data.questions.map((item) => (
              <Button
                type="button"
                disabled={item.order > countQuestions}
                key={item.order}
                className="mb-2 w-full bg-primary-foreground font-semibold shadow-none"
                variant="outline"
                leftIcon={
                  <Circle
                    className="pr-2"
                    height="18px"
                    width="18px"
                    fill="hsl(var(--success))"
                  />
                }
                title={`Question ${item.order}`}
                onClick={() => {
                  dispatch(setOrderQuestion(item.order))
                }}
              />
            ))}
        </div>
      </div>
    </div>
  )
})

export default Question
