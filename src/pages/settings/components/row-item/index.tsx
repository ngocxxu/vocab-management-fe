import { ButtonLib } from '@/components/ui/button'
import { GripVertical, Pen, Trash } from 'lucide-react'

export const RowItem = () => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <GripVertical className="text-slate-500" />
        Hello
      </div>
      <div className="flex gap-3">
        <ButtonLib className="h-6 w-6" variant="ghost" size="icon">
          <Pen />
        </ButtonLib>
        <ButtonLib className="h-6 w-6" variant="ghost" size="icon">
          <Trash className="text-red-600" />
        </ButtonLib>
      </div>
    </div>
  )
}
