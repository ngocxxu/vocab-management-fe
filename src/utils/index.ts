import { SortingState } from '@tanstack/react-table'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const removeOpenAttribute = (
  ref: React.MutableRefObject<HTMLDetailsElement>
) => {
  if (!ref.current) return
  ref.current.removeAttribute('open')
}

export const showModal = (id: string) => {
  return (document.getElementById(id) as HTMLDialogElement).showModal()
}

export const convertOrderBy = (sorting: SortingState) => {
  if (sorting[0]?.id) {
    return sorting[0]?.desc ? 'desc' : 'asc'
  } else {
    return undefined
  }
}

const customMinutes = (time: number) => {
  return time < 10 ? '0' + time : time
}

export const convertTime = (duration: number) => {
  return {
    hours: customMinutes(Math.floor(duration / 3600)),
    minutes: customMinutes(Math.floor(duration / 60)),
    seconds: duration % 60
  }
}
