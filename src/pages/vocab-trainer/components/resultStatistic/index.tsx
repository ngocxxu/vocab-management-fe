import {
  IconClock,
  IconSlash,
  IconSquareCheck,
  IconSquareX
} from '@tabler/icons-react'
import { format } from 'date-fns'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Button from '@/components/button'
import { cn } from '@/lib/utils'
import { setOrderQuestion } from '@/redux/reducer/vocabTrainer'
import { useGetVocabTrainer } from '@/services/vocabTrainer/useGetVocabTrainer'
import { convertTime } from '@/utils'
import { DEFAULT_COUNTDOWN } from '@/utils/constants'
import { CircleProgress } from '../circleProgress'
import { DetailTable } from '../detailTable'
import { LineProgressBar } from '../lineProgressBar'

export const ResultStatistic = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data } = useGetVocabTrainer(localStorage.getItem('examId') ?? '')
  const isPassed = data?.statusTest === 'Passed'
  const countPassed = data?.wordResults.filter(
    item => item.status === 'Passed'
  ).length

  const calPercent =
    data?.wordResults.length &&
    countPassed &&
    ((countPassed / data?.wordResults.length) * 100).toFixed(1)

  const calLinePercent = (Number(data?.duration) / DEFAULT_COUNTDOWN) * 100

  const { minutes, seconds, hours } = convertTime(Number(data?.duration))

  useEffect(() => {
    if (!localStorage.getItem('examId')) {
      navigate('/vocab-trainer')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="container my-10 grid grid-cols-9 gap-4">
      <div className="col-span-4 rounded-md border-t bg-white p-6 pb-0 font-semibold shadow-md">
        <p className="mb-1 text-lg font-bold">Result</p>
        <div className="flex items-start justify-between">
          <div>
            <div
              className={cn(
                'flex gap-2 text-2xl  mt-4',
                isPassed ? 'text-customGreen2' : 'text-customRed'
              )}
            >
              <div className="mt-1">
                {isPassed ? <IconSquareCheck /> : <IconSquareX />}
              </div>
              <div>
                <p>Test {data?.statusTest}</p>
                <p className="mt-3 text-sm font-normal text-customGray">
                  Thank you for taking the test.
                </p>
              </div>
            </div>
          </div>

          <CircleProgress
            isPassed={isPassed}
            percentage={Number(calPercent) ?? 0}
            statistic={`${countPassed}/${data?.wordResults.length}`}
          />
        </div>
      </div>

      <div className="col-span-5 rounded-md border-t bg-white p-6 font-semibold shadow-md">
        <p className="mb-1 text-lg font-bold">Timer</p>
        <div className="mt-4 flex gap-2 text-2xl">
          <div className="mt-1">
            <IconClock />
          </div>
          <div className="w-full">
            <p>Total time</p>
            <div className="mb-4 mt-6 flex items-center">
              <p>
                {hours}:{minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </p>
              <IconSlash className="mx-4 text-customGray" />
              <p className="text-customGray">00:20:00</p>
            </div>

            <LineProgressBar percentage={calLinePercent} />

            <div className="mt-8 grid grid-cols-12 gap-4">
              <div className="col-span-6 text-xl font-normal text-customGray">
                Start time
                <span className="ml-6 font-medium text-customBlack1">
                  17:43
                </span>
              </div>
              <div className="col-span-6 text-xl font-normal text-customGray">
                Date time
                <span className="ml-6 font-medium text-customBlack1">
                  {data?.updatedAt &&
                    format(new Date(data?.updatedAt), 'dd-MM-yyyy')}
                </span>
              </div>
              <div className="col-span-12 text-xl font-normal text-customGray">
                End time
                <span className="ml-8 font-medium text-customBlack1">
                  17:43
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
                  navigate('/vocab-trainer')
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-9 rounded-md border-t bg-white p-6 font-semibold shadow-md">
        <p className="mb-1 text-lg font-bold">Questions</p>
        <DetailTable data={data?.wordResults ?? []} />
      </div>
    </div>
  )
}
