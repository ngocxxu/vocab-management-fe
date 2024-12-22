import { DraggableAttributes } from '@dnd-kit/core'
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export const SortableItem = ({
  id,
  children
}: {
  id: number
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
    padding: '10px',
    backgroundColor: 'white',
    cursor: 'grab'
  }

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <button
      className="rounded-md border border-slate-300"
      ref={setNodeRef}
      style={style}
      onClick={handleButtonClick}
    >
      {children({ attributes, listeners })}
    </button>
  )
}
