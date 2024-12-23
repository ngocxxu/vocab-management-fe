import { AlertDialog } from '@/components/alertDialog'
import { ButtonLib } from '@/components/ui/button'
import { DraggableAttributes } from '@dnd-kit/core'
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import { GripVertical, Pen, Trash } from 'lucide-react'
import { TRowItem } from '../../types'

export const RowItem = ({
  name,
  setOpenModal,
  setEditing,
  attributes,
  listeners
}: TRowItem & {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  setEditing: React.Dispatch<React.SetStateAction<boolean>>
  attributes?: DraggableAttributes
  listeners?: SyntheticListenerMap
}) => {
  const handleOpenModal = () => {
    setOpenModal(true)
    setEditing(true)
  }

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-11 flex gap-2" {...attributes} {...listeners}>
        <GripVertical className="text-slate-500" />
        {name}
      </div>
      <div className="ml-auto flex gap-2">
        <ButtonLib
          className="h-6 w-6"
          variant="ghost"
          size="icon"
          onClick={handleOpenModal}
        >
          <Pen />
        </ButtonLib>
        <AlertDialog
          head={
            <ButtonLib className="h-6 w-6" variant="ghost" size="icon">
              <Trash className="text-red-600" />
            </ButtonLib>
          }
        />
      </div>
    </div>
  )
}
