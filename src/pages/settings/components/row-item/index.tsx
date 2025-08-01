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
        {/* 
        <WarningTable /> */}

        <AlertDialog
          head={
            <ButtonLib className="h-6 w-6" variant="ghost" size="icon">
              <Trash className="text-red-600" />
            </ButtonLib>
          }
          onYes={() => handleOnYes(id)}
        />
      </div>
    </div>
  )
}
