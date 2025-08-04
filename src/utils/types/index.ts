import { EQuestionType, EVocabTrainerStatus } from '@/pages/vocab-trainer/enum';
import { AxiosError } from 'axios'
import { UseMutationOptions } from 'react-query'

export type TOption = { label: string; value: string }

export type ResponseAPI<T> = { items: T } & TPagination

export type TPagination = {
  currentPage: number
  totalItems: number
  totalPages: number
}

export type TPage = {
  page: string
  pageSize: string
  sortBy?: string
  sortOrder?: string
}

export type TVocabQuery = {
  textSource?: string
  subjectIds?: string[]
  sourceLanguageCode?: string
  targetLanguageCode?: string
} & TPage

export type TVocabTrainerQuery = {
  name?: string
  status?: EVocabTrainerStatus
  questionType?: EQuestionType
} & TPage

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

export enum EUserRole {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  CUSTOMER = 'CUSTOMER'
}