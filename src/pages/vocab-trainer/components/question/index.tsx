import Button from '@/components/button';
import { ChevronLeft, ChevronRight, Circle, Clock } from 'lucide-react';
import { Choice } from '../choice';
import { useParams } from 'react-router-dom';
import { useGetQuestions } from '@/services/vocabTrainer/useGetQuestions';
import { setOrderQuestion } from '@/redux/reducer/vocabTrainer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useState } from 'react';

export const Question = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data } = useGetQuestions(id ?? '');
  const { orderQuestion } = useSelector(
    (state: RootState) => state.vocabTrainerReducer
  );
  const [countQuestions, setCountQuestions] = useState(1);

  if (!data) return;

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
            <p>00:05:30</p>
          </div>
        </div>
        <Choice data={data ?? []} setCountQuestions={setCountQuestions} />
      </div>

      <div className='bg-white rounded-md p-4 border-t shadow-md font-semibold'>
        Question list
        <div className='bg-customGray5 p-4 mt-3 rounded-md'>
          {data &&
            data.map((item) => (
              <Button
                disabled={item.order > countQuestions}
                key={item.order}
                className='bg-white w-full font-semibold mb-2'
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
