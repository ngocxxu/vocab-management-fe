import ProgressBar from 'react-customizable-progressbar'

type TCircleProgress = {
  percentage: number
  statistic: string
  isPassed: boolean
}

export const CircleProgress = ({
  percentage,
  statistic,
  isPassed
}: TCircleProgress) => {
  return (
    <ProgressBar
      progress={percentage}
      radius={100}
      strokeWidth={40}
      strokeColor={isPassed ? 'hsl(var(--success))' : 'hsl(var(--error))'}
      trackStrokeWidth={40}
      trackStrokeColor="hsl(var(--card))"
      pointerRadius={18}
      pointerStrokeWidth={0}
    >
      <div className="absolute top-0 flex h-full w-full items-center justify-center">
        <div>
          <p className="text-3xl font-bold">{percentage}%</p>
          <p className="mt-1 text-center font-normal text-secondary-foreground">
            {statistic}
          </p>
        </div>
      </div>
    </ProgressBar>
  )
}
