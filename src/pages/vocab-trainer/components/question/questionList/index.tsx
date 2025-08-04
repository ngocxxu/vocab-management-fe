import Button from '@/components/button'
import { TQuestionAPI } from '@/pages/vocab-trainer/types'
import { setOrderQuestion } from '@/redux/reducer/vocabTrainer'
import { Circle } from 'lucide-react'
import { memo } from 'react'
import { useDispatch } from 'react-redux'

type TQuestionListProps = {
  data: TQuestionAPI
  countQuestions: number
}

const QuestionList = memo(({ data, countQuestions }: TQuestionListProps) => {
  const dispatch = useDispatch()
  return (
    <div className="rounded-md border-t bg-primary-foreground p-4 font-semibold shadow-md">
      Question list
      <div className="mt-3 rounded-md bg-popover p-4">
        {data &&
          data.questions.map((_, index) => {
            const order = index + 1
            const isDisabled = order > countQuestions
            return (
            <Button
              type="button"
              disabled={isDisabled}
              key={order}
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
              title={`Question ${order}`}
              onClick={() => {
                dispatch(setOrderQuestion(order))
              }}
            />
          )})}
      </div>
    </div>
  )
})

export default QuestionList
