import { SortableItem } from '@/components/dnd/SortableItem'
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
import { useState } from 'react'

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
      <p className="font-medium">Subject Items</p>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((id) => (
            <SortableItem key={id} id={id}>
              Hi
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  )
}
