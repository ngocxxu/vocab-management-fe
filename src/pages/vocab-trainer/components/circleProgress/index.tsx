import 'react-circular-progressbar/dist/styles.css';
import ProgressBar from 'react-customizable-progressbar';

export const CircleProgress = () => {
  return (
    <ProgressBar
      progress={60}
      radius={120}
      strokeWidth={50}
      strokeColor='#14B8A6'
      trackStrokeWidth={50}
      trackStrokeColor='#E4E6EF'
      pointerRadius={18}
      pointerStrokeWidth={0}
    >
      <div className='flex justify-center items-center absolute top-0 w-full h-full'>
        <div>
          <p className='text-3xl font-bold'>{60}%</p>
          <p className='text-customBlack1 font-normal mt-1 text-center'>5/10</p>
        </div>
      </div>
    </ProgressBar>
  );
};
