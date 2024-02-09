import Avatar from '@/components/avatar';
import { Calendar } from '@/components/calendar';
import {
  IconBook2,
  IconBrandSpeedtest,
  IconWriting,
} from '@tabler/icons-react';
import 'react-day-picker/dist/style.css';

export const NoticeCalendar = () => {
  return (
    <div className='p-8 pr-0 rounded-xl shadow-md border-t'>
      <div className='grid grid-cols-3'>
        <div className='border-r'>
          <h1 className='font-semibold'>Notice</h1>
          <p className='text-sm text-customGray col-span-2'>
            What do you need to pay attention to today?
          </p>
          <div className='flex items-center gap-2 mt-3 mb-6'>
            <Avatar
              className='w-8 h-8'
              classNameContent='bg-customRed opacity-60'
            >
              <IconBrandSpeedtest size='1.1rem' />
            </Avatar>
            <Avatar
              className='w-8 h-8'
              classNameContent='bg-customGreen opacity-60'
            >
              <IconBook2 size='1.1rem' />
            </Avatar>
            <Avatar
              className='w-8 h-8'
              classNameContent='bg-customYellow opacity-60'
            >
              <IconWriting size='1.1rem' />
            </Avatar>
          </div>
          <ul className='text-sm list-disc'>
            <li>Retake the failed test on January 29</li>
            <li>Execute the test created on January 22nd a second time </li>
            <li>Added 10 new vocabulary words</li>
          </ul>
        </div>
        <div className='col-span-2 flex flex-col justify-center items-center'>
          <Calendar />
        </div>
      </div>
    </div>
  );
};
