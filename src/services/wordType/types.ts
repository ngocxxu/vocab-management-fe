export type TWordType = {
  id: string
  name: string
  description: string
}

export type TCreateWordType = Omit<TWordType, 'id'>

export type TUpdateWordType = {
  data: TCreateWordType
  id: string
} 