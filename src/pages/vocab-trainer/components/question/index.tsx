import Button from '@/components/button';
import { ChevronLeft, ChevronRight, Circle, Clock } from 'lucide-react';
import { Choice } from '../choice';

export const Question = () => {
  return (
    <div className='container my-10 grid grid-cols-5 gap-4'>
      <div className='col-span-4 flex flex-col gap-4'>
        <div className='flex justify-between items-center'>
          <div className='flex justify-center items-center gap-1'>
            <Button variant='ghost' size='icon' leftIcon={<ChevronLeft />} />
            <div className='bg-white mx-auto rounded-md p-2 border font-semibold'>
              Question 1/10
            </div>
            <Button variant='ghost' size='icon' leftIcon={<ChevronRight />} />
          </div>
          <div className='bg-white rounded-md p-2 border font-semibold flex gap-2'>
            <Clock />
            <p>00:05:30</p>
          </div>
        </div>
        <div className='bg-white rounded-md p-4 border-t shadow-md'>
          <p className='font-semibold'>Question</p>
          <div className='bg-customGray6 p-3 rounded-md mt-3 mb-5 font-medium text-sm'>
            Please choose the meaning of the word{' '}
            <span className='font-bold ml-1 text-white bg-customBlue p-1 rounded'>
              막연하다.
            </span>
          </div>
          <p className='font-semibold mb-3'>Choice</p>
          <Choice />
        </div>
      </div>

      <div className='bg-white rounded-md p-4 border-t shadow-md font-semibold'>
        Question list
        <div className='bg-customGray5 p-4 mt-3 rounded-md'>
          <Button
            className='bg-white w-full font-semibold'
            variant='outline'
            leftIcon={
              <Circle
                className='pr-2'
                height='18px'
                width='18px'
                fill='#037847'
              />
            }
            title='Question 1'
          />
        </div>
      </div>
    </div>
  );
};
