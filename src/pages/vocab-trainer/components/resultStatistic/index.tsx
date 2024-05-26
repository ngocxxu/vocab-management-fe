import { IconSquareCheck } from '@tabler/icons-react';
import { CircleProgress } from '../circleProgress';

export const ResultStatistic = () => {
  return (
    <div className='container my-10 grid grid-cols-9 gap-4'>
      <div className='col-span-4 bg-white rounded-md p-6 font-semibold shadow-md border-t'>
        <p>Result</p>
        <div className='flex justify-between items-start'>
          <div>
            <div className='flex gap-2'>
              <IconSquareCheck />
              <div>
                <p>Test passed</p>
                <p>Thank you for taking the test.</p>
              </div>
            </div>
          </div>

          <CircleProgress />
        </div>
      </div>
      <div className='col-span-5 bg-white rounded-md p-6 font-semibold shadow-md border-t'>
        2
      </div>
      <div className='col-span-9 bg-white rounded-md p-6 font-semibold shadow-md border-t'>
        3
      </div>
    </div>
  );
};
