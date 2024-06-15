import { Calendar as CalendarLib } from '@/components/ui/calendar'
import { useState } from 'react'

export const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return <CalendarLib mode="single" selected={date} onSelect={setDate} />
}
