import {
  IconClock,
  IconSlash,
  IconSquareCheck,
  IconSquareX
} from '@tabler/icons-react'
import { format } from 'date-fns'
import { memo, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Button from '@/components/button'
import { Loader } from '@/components/loader'
import { cn } from '@/lib/utils'
import { setOrderQuestion } from '@/redux/reducer/vocabTrainer'
import { useGetVocabTrainer } from '@/services/vocabTrainer/useGetVocabTrainer'
import { usePostQuestion } from '@/services/vocabTrainer/usePostQuestion'
import { convertTime } from '@/utils'
import { DEFAULT_COUNTDOWN } from '@/utils/constants'
import { CircleProgress } from '../circleProgress'
import { DetailTable } from '../detailTable'
import { LineProgressBar } from '../lineProgressBar'
import { EVocabTrainerStatus } from '../../enum'

const ResultStatistic = memo(() => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const examId = localStorage.getItem('examId') ?? ''
  const { data } = useGetVocabTrainer(examId)
  const {
    mutate: mutateQuestion,
    isLoading: isLoadingQuestion,
    isSuccess,
    isError
  } = usePostQuestion()

  const isPassed = data?.status === EVocabTrainerStatus.PASSED
  const countPassed = data?.results.filter(
    (item) => item.status === EVocabTrainerStatus.PASSED
  ).length

  const calPercent = useMemo(() => {
    if (!data?.results?.length || countPassed === undefined) return '0'

    return ((countPassed / data.results.length) * 100).toFixed(1)
  }, [countPassed, data?.results?.length])

  const calLinePercent = (Number(data?.countTime) / DEFAULT_COUNTDOWN) * 100

  const { minutes, seconds, hours } = convertTime(Number(data?.countTime))
  const {
    minutes: minutes2,
    seconds: seconds2,
    hours: hours2
  } = convertTime(Number(data?.setCountTime))

  useEffect(() => {
    if (isSuccess) {
      navigate('/vocab-trainer/examination')
    }

    if (isError) {
      navigate('/vocab-trainer')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError])

  useEffect(() => {
    if (!localStorage.getItem('examId')) {
      navigate('/vocab-trainer')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoadingQuestion) {
    return <Loader />
  }

  return (
    <div className="container grid grid-cols-9 gap-4">
      <div className="col-span-4 rounded-md border-t bg-primary-foreground p-6 pb-0 font-semibold shadow-md">
        <p className="mb-1 text-lg font-bold">Result</p>
        <div className="flex items-start justify-between">
          <div>
            <div
              className={cn(
                'mt-4 flex gap-2 text-2xl',
                isPassed ? 'text-success' : 'text-error'
              )}
            >
              <div className="mt-1">
                {isPassed ?
                  <IconSquareCheck />
                : <IconSquareX />}
              </div>
              <div>
                <p>Test {data?.status}</p>
                <p className="mt-3 text-sm font-normal text-secondary-foreground">
                  Thank you for taking the test.
                </p>
              </div>
            </div>
          </div>

          <CircleProgress
            isPassed={isPassed}
            percentage={Number(calPercent) || 0}
            statistic={`${countPassed ?? 0}/${data?.results.length ?? 0}`}
          />
        </div>
      </div>

      <div className="col-span-5 rounded-md border-t bg-primary-foreground p-6 font-semibold shadow-md">
        <p className="mb-1 text-lg font-bold">Timer</p>
        <div className="mt-4 flex gap-2 text-2xl">
          <div className="mt-1">
            <IconClock />
          </div>
          <div className="w-full">
            <p>Total time</p>
            <div className="mb-4 mt-6 flex items-center">
              <p>
                {hours || '00'}:{minutes || '00'}:
                {seconds < 10 ? `0${seconds || '0'}` : seconds || '00'}
              </p>
              <IconSlash className="mx-4 text-secondary-foreground" />
              <p className="text-secondary-foreground">
                {hours2 || '00'}:{minutes2 || '00'}:
                {seconds2 < 10 ? `0${seconds2 || '0'}` : seconds2 || '00'}
              </p>
            </div>

            <LineProgressBar percentage={calLinePercent} />

            <div className="mt-8 grid grid-cols-12 gap-4">
              <div className="col-span-6 text-xl font-normal text-secondary-foreground">
                Name test:
                <span className="ml-6 font-medium text-secondary-foreground">
                  {data?.name}
                </span>
              </div>
              <div className="col-span-6 text-xl font-normal text-secondary-foreground">
                Date time:
                <span className="ml-6 font-medium text-secondary-foreground">
                  {data?.updatedAt &&
                    format(new Date(data?.updatedAt), 'dd-MM-yyyy')}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="mt-4"
                title="Back"
                onClick={() => {
                  dispatch(setOrderQuestion(1))
                  navigate('/vocab-trainer')
                }}
              />
              <Button
                className="mt-4"
                title="Retest"
                onClick={() => {
                  dispatch(setOrderQuestion(1))
                  mutateQuestion(examId)
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-9 rounded-md border-t bg-primary-foreground p-6 font-semibold shadow-md">
        <p className="mb-1 text-lg font-bold">Questions</p>
        <DetailTable data={data?.results ?? []} />
      </div>
    </div>
  )
})
export default ResultStatistic
