/* eslint-disable @typescript-eslint/no-explicit-any */
import GroupButton from '@/components/button/GroupButton'
import { SortableItem } from '@/components/dnd/SortableItem'
import { Modal } from '@/components/modal'
import { ButtonLib } from '@/components/ui/button'
import { InputLib } from '@/components/ui/input'
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { TRowItem } from '../../types'
import { RowItem } from '../row-item'

const data: TRowItem[] = [
  {
    id: 1,
    name: 'item 1',
    order: 1
  },
  {
    id: 2,
    name: 'item 2',
    order: 2
  }
]

export const CustomSubjects = () => {
  const [items, setItems] = useState(data)
  const [openModal, setOpenModal] = useState(false)
  const [editItem, setEditItem] = useState<TRowItem | null>(null)
  const { handleSubmit, control, watch, setValue, reset } = useForm<{
    name: string
  }>({
    defaultValues: {
      name: ''
    }
  })

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id)
      const newIndex = items.findIndex((item) => item.id === over.id)

      const newItems = arrayMove(items, oldIndex, newIndex)

      const updatedItems = newItems.map((item, index) => ({
        ...item,
        order: index + 1
      }))

      try {
        setItems(updatedItems)
      } catch (error) {
        console.error('Failed to update orders:', error)
      }
    }
  }

  const onSubmit = (formData: { name: string }) => {
    console.log({ formData })
  }

  useEffect(() => {
    if (editItem) {
      setValue('name', editItem.name)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editItem])

  return (
    <>
      <div>
        <div className="mb-3 flex justify-between">
          <p className="font-medium">Subject Items</p>
          <ButtonLib className="h-8" onClick={() => setOpenModal(true)}>
            <Plus /> Add subject
          </ButtonLib>
        </div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-2">
              {items.map((item) => (
                <SortableItem key={item.id} id={item.id}>
                  {({ attributes, listeners }: any) => (
                    <RowItem
                      id={item.id}
                      name={item.name}
                      order={item.order}
                      setOpenModal={setOpenModal}
                      setEditItem={setEditItem}
                      attributes={attributes}
                      listeners={listeners}
                    />
                  )}
                </SortableItem>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      <Modal
        title={`${editItem ? 'Update' : 'Create'} subject`}
        open={openModal}
        onOpenChange={setOpenModal}
        onCloseAutoFocus={() => {
          setEditItem(null)
          reset()
        }}
        body={
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <div className="mb-4">
                  <InputLib
                    className="border-0"
                    type="text"
                    placeholder="Subject name"
                    {...field}
                  />
                </div>
              )}
            />
            <div className="justify-cente6 mt-6">
              <GroupButton
                variantNo="ghost"
                onClose={() => {
                  setOpenModal(false)
                  setEditItem(null)
                  reset()
                }}
                disabledYes={!watch('name')}
              />
            </div>
          </form>
        }
        className="max-h-[90vh] w-full max-w-[100vh] overflow-x-auto"
      />
    </>
  )
}
