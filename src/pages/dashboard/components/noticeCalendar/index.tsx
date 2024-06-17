import Avatar from '@/components/avatar'
import { Calendar } from '@/components/calendar'
import { IconBook2, IconBrandSpeedtest, IconWriting } from '@tabler/icons-react'
import 'react-day-picker/dist/style.css'

export const NoticeCalendar = () => {
  return (
    <div className="rounded-xl border-t p-8 pr-0 shadow-md">
      <div className="grid grid-cols-3">
        <div className="border-r">
          <h1 className="font-semibold">Notice</h1>
          <p className="col-span-2 text-sm text-secondary">
            What do you need to pay attention to today?
          </p>
          <div className="mb-6 mt-3 flex items-center gap-2">
            <Avatar className="h-8 w-8" classNameContent="bg-error opacity-60">
              <IconBrandSpeedtest size="1.1rem" />
            </Avatar>
            <Avatar
              className="h-8 w-8"
              classNameContent="bg-success opacity-60 text-black"
            >
              <IconBook2 size="1.1rem" />
            </Avatar>
            <Avatar
              className="h-8 w-8"
              classNameContent="opacity-60 bg-warning"
            >
              <IconWriting size="1.1rem" />
            </Avatar>
          </div>
          <ul className="list-disc text-sm">
            <li>Retake the failed test on January 29</li>
            <li>Execute the test created on January 22nd a second time </li>
            <li>Added 10 new vocabulary words</li>
          </ul>
        </div>
        <div className="col-span-2 flex flex-col items-center justify-center">
          <Calendar />
        </div>
      </div>
    </div>
  )
}
