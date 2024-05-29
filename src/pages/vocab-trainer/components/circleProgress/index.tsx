import ProgressBar from 'react-customizable-progressbar';

type TCircleProgress = {
  percentage: number;
  statistic: string;
  isPassed: boolean;
};

export const CircleProgress = ({
  percentage,
  statistic,
  isPassed,
}: TCircleProgress) => {
  return (
    <ProgressBar
      progress={percentage}
      radius={120}
      strokeWidth={50}
      strokeColor={isPassed ? '#14B8A6' : '#F82C5D'}
      trackStrokeWidth={50}
      trackStrokeColor='#E4E6EF'
      pointerRadius={18}
      pointerStrokeWidth={0}
    >
      <div className='flex justify-center items-center absolute top-0 w-full h-full'>
        <div>
          <p className='text-3xl font-bold'>{percentage}%</p>
          <p className='text-customBlack1 font-normal mt-1 text-center'>
            {statistic}
          </p>
        </div>
      </div>
    </ProgressBar>
  );
};
