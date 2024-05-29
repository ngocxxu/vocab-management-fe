import { IconClock, IconSlash, IconSquareCheck } from '@tabler/icons-react';
import { CircleProgress } from '../circleProgress';

export const ResultStatistic = () => {
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

            <div className='relative w-full'>
              <span
                className='absolute bottom-1 z-10 -translate-x-5 w-4 h-4 bg-white rounded-full'
                style={{ left: '50%' }}
              />
              <div className='relative flex w-full h-6 overflow-hidden rounded-3xl bg-gray-100'>
                <div className='w-full  bg-gray-100 rounded-3xl h-6 '>
                  <div
                    role='progressbar'
                    className='bg-customBlack1 h-6 rounded-3xl'
                    style={{ width: '50%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-span-9 bg-white rounded-md p-6 font-semibold shadow-md border-t'>
        3
      </div>
    </div>
  );
};
