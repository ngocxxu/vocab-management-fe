import React from 'react';

import { format } from 'date-fns';
import { CaptionProps, DayPicker, useNavigation } from 'react-day-picker';
import { Separator } from '../ui/separator';
import IconArrowLeft from '@/assets/svg/IconArrowLeft';
import IconArrowRight from '@/assets/svg/IconArrowRight';

function CustomCaption(props: CaptionProps) {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  return (
    <>
      <div className='flex justify-between items-center mb-2'>
        <button
          disabled={!previousMonth}
          onClick={() => previousMonth && goToMonth(previousMonth)}
        >
          <IconArrowLeft />
        </button>
        <div className='font-semibold'>
          {format(props.displayMonth, 'MMMM yyy')}
        </div>
        <button
          disabled={!nextMonth}
          onClick={() => nextMonth && goToMonth(nextMonth)}
        >
          <IconArrowRight />
        </button>
      </div>
      <Separator />
    </>
  );
}

export const Calendar = () => {
  const [selected, setSelected] = React.useState<Date>();

  return (
    <DayPicker
      className='m-0'
      components={{
        Caption: CustomCaption,
      }}
      mode='single'
      selected={selected}
      onSelect={setSelected}
    />
  );
};
