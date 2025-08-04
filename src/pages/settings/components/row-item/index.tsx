import { AlertDialog } from '@/components/alertDialog'
import { ButtonLib } from '@/components/ui/button'
import { DraggableAttributes } from '@dnd-kit/core'
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import { AxiosResponse } from 'axios'
import { GripVertical, Pen, Trash } from 'lucide-react'
import { UseMutateFunction } from 'react-query'
import { TVocabSubject } from '../../types'

export const RowItem = ({
  setOpenModal,
  setEditItem,
  attributes,
  listeners,
  mutateDelete,
  item
}: TVocabSubject & {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  setEditItem: React.Dispatch<
    React.SetStateAction<Omit<TVocabSubject, 'id' | 'order'> | null>
  >
  attributes?: DraggableAttributes
  listeners?: SyntheticListenerMap
  mutateDelete: UseMutateFunction<AxiosResponse, unknown, string, unknown>
  item: TVocabSubject
}) => {
  const { name, id } = item
  const handleOpenModal = () => {
    setOpenModal(true)
    setEditItem({ name })
  }

  const handleOnYes = (id: string) => {
    mutateDelete(id)
  }

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div className="grid grid-cols-12 items-center">
      <div className="col-span-11 flex items-center gap-2">
        <div
          className="cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="text-slate-500" />
        </div>
        <span className="flex-1">{name}</span>
      </div>
      <div className="ml-auto flex gap-2">
        <ButtonLib
          className="h-6 w-6"
          variant="ghost"
          size="icon"
          onClick={(e) => {
            handleButtonClick(e)
            handleOpenModal()
          }}
        >
          <Pen />
        </ButtonLib>

        <AlertDialog
          head={
            <ButtonLib
              className="h-6 w-6"
              variant="ghost"
              size="icon"
              onClick={handleButtonClick}
            >
              <Trash className="text-red-600" />
            </ButtonLib>
          }
          onYes={() => handleOnYes(id)}
        />
      </div>
    </div>
  )
}
