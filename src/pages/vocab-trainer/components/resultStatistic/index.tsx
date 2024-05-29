import { IconClock, IconSlash, IconSquareCheck } from '@tabler/icons-react';
import { CircleProgress } from '../circleProgress';
import { LineProgressBar } from '../lineProgressBar';
import { DetailTable } from '../detailTable';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

export const ResultStatistic = () => {
  const { itemVocabTrainer } = useSelector(
    (state: RootState) => state.vocabTrainerReducer
  );

  return (
    <div className='container my-10 grid grid-cols-9 gap-4'>
      <div className='col-span-4 bg-white rounded-md p-6 pb-0 font-semibold shadow-md border-t'>
        <p className='text-lg font-bold mb-1'>Result</p>
        <div className='flex justify-between items-start'>
          <div>
            <div className='flex gap-2 text-2xl text-customGreen2 mt-4'>
              <div className='mt-1'>
                <IconSquareCheck />
              </div>
              <div>
                <p>Test passed</p>
                <p className='text-sm text-customGray font-normal mt-3'>
                  Thank you for taking the test.
                </p>
              </div>
            </div>
          </div>

          <CircleProgress />
        </div>
      </div>

      <div className='col-span-5 bg-white rounded-md p-6 font-semibold shadow-md border-t'>
        <p className='text-lg font-bold mb-1'>Timer</p>
        <div className='flex gap-2 text-2xl mt-4'>
          <div className='mt-1'>
            <IconClock />
          </div>
          <div className='w-full'>
            <p>Total time</p>
            <div className='flex items-center mt-6 mb-4'>
              <p>00:12:04</p>
              <IconSlash className='text-customGray mx-4' />
              <p className='text-customGray'>00:30:00</p>
            </div>

            <LineProgressBar percentage={50} />

            <div className='grid grid-cols-12 gap-4 mt-8'>
              <div className='col-span-6 text-customGray text-xl font-normal'>
                Start time
                <span className='ml-6 text-customBlack1 font-medium'>
                  17:43
                </span>
              </div>
              <div className='col-span-6 text-customGray text-xl font-normal'>
                Date time
                <span className='ml-6 text-customBlack1 font-medium'>
                  2024-02-21
                </span>
              </div>
              <div className='col-span-12 text-customGray text-xl font-normal'>
                End time
                <span className='ml-8 text-customBlack1 font-medium'>
                  17:43
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='col-span-9 bg-white rounded-md p-6 font-semibold shadow-md border-t'>
        <p className='text-lg font-bold mb-1'>Questions</p>
        <DetailTable data={itemVocabTrainer} />
      </div>
    </div>
  );
};
