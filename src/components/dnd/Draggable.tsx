import { useDraggable } from '@dnd-kit/core'

export function Draggable(props: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: props.id
  })

  return (
    <li ref={setNodeRef} {...listeners} {...attributes}>
      {props.children}
    </li>
  )
}
