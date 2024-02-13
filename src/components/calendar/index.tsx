import React from 'react';

import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { format } from 'date-fns';
import { CaptionProps, DayPicker, useNavigation } from 'react-day-picker';
import { Separator } from '../ui/separator';

function CustomCaption(props: CaptionProps) {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  return (
    <>
      <div className='flex justify-between items-center mb-2'>
        <button
          disabled={!previousMonth}
          onClick={() => previousMonth && goToMonth(previousMonth)}
        >
          <IconChevronLeft />
        </button>
        <div className='font-semibold'>
          {format(props.displayMonth, 'MMMM yyy')}
        </div>
        <button
          disabled={!nextMonth}
          onClick={() => nextMonth && goToMonth(nextMonth)}
        >
          <IconChevronRight />
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
