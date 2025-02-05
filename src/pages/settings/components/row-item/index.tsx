import { AlertDialog } from '@/components/alertDialog'
import { ButtonLib } from '@/components/ui/button'
import { DraggableAttributes } from '@dnd-kit/core'
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import { GripVertical, Pen, Trash } from 'lucide-react'
import { TVocabSubject } from '../../types'

export const RowItem = ({
  id,
  name,
  order,
  setOpenModal,
  setEditItem,
  attributes,
  listeners
}: TVocabSubject & {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  setEditItem: React.Dispatch<React.SetStateAction<TVocabSubject | null>>
  attributes?: DraggableAttributes
  listeners?: SyntheticListenerMap
}) => {
  const handleOpenModal = () => {
    setOpenModal(true)
    setEditItem({ id, name, order })
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
