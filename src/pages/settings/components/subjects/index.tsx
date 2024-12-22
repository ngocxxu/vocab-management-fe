import { SortableItem } from '@/components/dnd/SortableItem'
import { ButtonLib } from '@/components/ui/button'
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
import { useState } from 'react'
import { RowItem } from '../row-item'

export const CustomSubjects = () => {
  const [items, setItems] = useState([1, 2, 3, 4, 5])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(Number(active.id))
        const newIndex = items.indexOf(Number(over?.id))
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <div>
      <div className="mb-3 flex justify-between">
        <p className="font-medium">Subject Items</p>
        <ButtonLib className="h-8">
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
            {items.map((id) => (
              <SortableItem key={id} id={id}>
                <RowItem />
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
