import { DraggableAttributes } from '@dnd-kit/core'
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export const SortableItem = ({
  id,
  children
}: {
  id: string | number
  children: (handlers: {
    attributes?: DraggableAttributes
    listeners?: SyntheticListenerMap
  }) => React.ReactNode
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab'
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="rounded-md border border-slate-300 bg-white p-3"
    >
      {children({ attributes, listeners })}
    </div>
  )
}
