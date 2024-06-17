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
      radius={120}
      strokeWidth={50}
      strokeColor={isPassed ? '#14B8A6' : '#F82C5D'}
      trackStrokeWidth={50}
      trackStrokeColor="#E4E6EF"
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
