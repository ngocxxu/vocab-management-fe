/* eslint-disable @typescript-eslint/no-explicit-any */
import GroupButton from '@/components/button/GroupButton'
import { SortableItem } from '@/components/dnd/SortableItem'
import { Loader } from '@/components/loader'
import { Modal } from '@/components/modal'
import { ButtonLib } from '@/components/ui/button'
import { InputLib } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useDeleteVocabSubject } from '@/services/vocabSubject/useDeleteVocabSubject'
import { useGetAllVocabSubject } from '@/services/vocabSubject/useGetAllVocabSubject'
import { usePostVocabSubject } from '@/services/vocabSubject/usePostVocabSubject'
import { usePutVocabSubject } from '@/services/vocabSubject/usePutVocabSubject'
import { useReorderVocabSubject } from '@/services/vocabSubject/useReorderVocabSubject'
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
import { TVocabSubject } from '../../types'
import { RowItem } from '../row-item'

export const CustomSubjects = () => {
  const [items, setItems] = useState<TVocabSubject[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [editItem, setEditItem] = useState<Omit<
    TVocabSubject,
    'id' | 'order'
  > | null>(null)
  const { handleSubmit, control, watch, setValue, reset } = useForm<{
    name: string
  }>({
    defaultValues: {
      name: ''
    }
  })
  const { data: dataVocabSubject, isLoading } = useGetAllVocabSubject()
  const { mutate: mutatePost, isLoading: isLoadingPost } = usePostVocabSubject()
  const { mutate: mutatePut, isLoading: isLoadingPut } = usePutVocabSubject()
  const { mutate: mutateReorder, isLoading: isLoadingReorder } =
    useReorderVocabSubject()
  const { mutate: mutateDelete, isLoading: isLoadingDelete } =
    useDeleteVocabSubject()

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

        // Call the API to update the orders
        mutateReorder({
          items: updatedItems.map((item) => ({
            _id: item._id,
            order: item.order
          }))
        })
      } catch (error) {
        console.error('Failed to update orders:', error)
      }
    }
  }
  const onSubmit = (formData: { name: string }) => {
    if (editItem) {
      mutatePut({
        id: editItem._id,
        data: {
          name: formData.name
        }
      })
    } else {
      mutatePost({
        name: formData.name,
        order: items.length + 1
      })
    }
    setOpenModal(false)
  }

  useEffect(() => {
    if (dataVocabSubject && dataVocabSubject?.data.length > 0) {
      setItems(dataVocabSubject.data)
    }
  }, [dataVocabSubject])

  useEffect(() => {
    if (editItem) {
      setValue('name', editItem.name)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editItem])

  if (
    isLoading ||
    isLoadingReorder ||
    isLoadingDelete ||
    isLoadingPost ||
    isLoadingPut
  ) {
    return <Loader />
  }

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
            <ScrollArea className="h-[75vh]">
              <div className="flex flex-col gap-2">
                {items.map((item) => (
                  <SortableItem key={item.id} id={item.id}>
                    {({ attributes, listeners }: any) => (
                      <RowItem
                        {...item}
                        setOpenModal={setOpenModal}
                        setEditItem={setEditItem}
                        attributes={attributes}
                        listeners={listeners}
                        mutateDelete={mutateDelete}
                        item={item}
                      />
                    )}
                  </SortableItem>
                ))}
              </div>
            </ScrollArea>
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
