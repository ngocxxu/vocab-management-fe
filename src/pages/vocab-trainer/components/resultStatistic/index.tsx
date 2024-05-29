import { cn } from '@/lib/utils';
import { useGetVocabTrainer } from '@/services/vocabTrainer/useGetVocabTrainer';
import {
  IconClock,
  IconSlash,
  IconSquareCheck,
  IconSquareX,
} from '@tabler/icons-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleProgress } from '../circleProgress';
import { LineProgressBar } from '../lineProgressBar';
import { format } from 'date-fns';

export const ResultStatistic = () => {
  const navigate = useNavigate();
  const { data } = useGetVocabTrainer(localStorage.getItem('examId') ?? '');
  const isPassed = data?.statusTest === 'Passed';
  const countPassed = data?.wordResults.filter(
    (item) => item.status === 'Passed'
  ).length;

  const calPercent =
    data?.wordResults.length &&
    countPassed &&
    (countPassed / data?.wordResults.length).toFixed(1);

  useEffect(() => {
    if (!localStorage.getItem('examId')) {
      navigate('/vocab-trainer');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='container my-10 grid grid-cols-9 gap-4'>
      <div className='col-span-4 bg-white rounded-md p-6 pb-0 font-semibold shadow-md border-t'>
        <p className='text-lg font-bold mb-1'>Result</p>
        <div className='flex justify-between items-start'>
          <div>
            <div
              className={cn(
                'flex gap-2 text-2xl  mt-4',
                isPassed ? 'text-customGreen2' : 'text-customRed'
              )}
            >
              <div className='mt-1'>
                {isPassed ? <IconSquareCheck /> : <IconSquareX />}
              </div>
              <div>
                <p>Test {data?.statusTest}</p>
                <p className='text-sm text-customGray font-normal mt-3'>
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

      <div className='col-span-5 bg-white rounded-md p-6 font-semibold shadow-md border-t'>
        <p className='text-lg font-bold mb-1'>Timer</p>
        <div className='flex gap-2 text-2xl mt-4'>
          <div className='mt-1'>
            <IconClock />
          </div>
          <div className='w-full'>
            <p>Total time</p>
            <div className='flex items-center mt-6 mb-4'>
              <p>{format(new Date(data?.duration ?? 0), 'HH:mm:ss')}</p>
              <IconSlash className='text-customGray mx-4' />
              <p className='text-customGray'>00:20:00</p>
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
                  {format(new Date(data?.updatedAt ?? ''), 'dd-MM-yyyy')}
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
        {/* <DetailTable data={wordResults ?? []} /> */}
      </div>
    </div>
  );
};
