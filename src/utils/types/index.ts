import { AxiosError } from 'axios'
import { UseMutationOptions } from 'react-query'

export type TOption = {
  label: string
  value: string
}

export type ResponseAPI<T> = {
  data: T
} & TPagination

export type TPagination = {
  currentPage: number
  totalItems: number
  totalPages: number
}

export type TPage = {
  page: string
  pageSize: string
  sortBy?: string
  orderBy?: string
  subjectFilter?: string[]
  statusFilter?: string[]
  search?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TExtractFnReturn<FnType extends (...args: any) => any> = Awaited<
  ReturnType<FnType>
>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TMutationConfig<MutationFnType extends (...args: any) => any> =
  UseMutationOptions<
    TExtractFnReturn<MutationFnType>,
    AxiosError,
    Parameters<MutationFnType>[0]
  >
