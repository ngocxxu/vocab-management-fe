import Button from '@/components/button';
import { setOrderQuestion } from '@/redux/reducer/vocabTrainer';
import { RootState } from '@/redux/store';
import { ChevronLeft, ChevronRight, Circle, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TQuestion } from '../../types';
import { Choice } from '../choice';
import { Countdown } from '../countDown';

export const Question = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [countdown, setCountdown] = useState(1200);

  const { orderQuestion } = useSelector(
    (state: RootState) => state.vocabTrainerReducer
  );
  const [countQuestions, setCountQuestions] = useState(1);
  const [data, setData] = useState<TQuestion[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem('questions');
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      navigate('/vocab-trainer');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (data.length <= 0) {
    return;
  }

  return (
    <div className='container my-10 grid grid-cols-5 gap-4'>
      <div className='col-span-4 flex flex-col gap-4'>
        <div className='flex justify-between items-center'>
          <div className='flex justify-center items-center gap-1'>
            <Button
              disabled={orderQuestion === 1}
              variant='ghost'
              size='icon'
              leftIcon={<ChevronLeft />}
              onClick={() => {
                dispatch(setOrderQuestion(orderQuestion - 1));
              }}
            />
            <div className='bg-white mx-auto rounded-md p-2 border font-semibold'>
              {`Question ${orderQuestion}/${data.length}`}
            </div>
            <Button
              disabled={countQuestions <= orderQuestion}
              variant='ghost'
              size='icon'
              leftIcon={<ChevronRight />}
              onClick={() => {
                dispatch(setOrderQuestion(orderQuestion + 1));
              }}
            />
          </div>
          <div className='bg-white rounded-md p-2 border font-semibold flex gap-2'>
            <Clock />
            <Countdown countdown={countdown} setCountdown={setCountdown} />
          </div>
        </div>
        <Choice data={data ?? []} countdown={countdown} setCountQuestions={setCountQuestions} />
      </div>

      <div className='bg-white rounded-md p-4 font-semibold shadow-md border-t'>
        Question list
        <div className='bg-customGray5 p-4 mt-3 rounded-md'>
          {data &&
            data.map((item) => (
              <Button
                disabled={item.order > countQuestions}
                key={item.order}
                className='bg-white w-full font-semibold mb-2 shadow-none'
                variant='outline'
                leftIcon={
                  <Circle
                    className='pr-2'
                    height='18px'
                    width='18px'
                    fill='#037847'
                  />
                }
                title={`Question ${item.order}`}
                onClick={() => {
                  dispatch(setOrderQuestion(item.order));
                }}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
