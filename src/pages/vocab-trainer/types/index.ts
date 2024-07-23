import { TOption } from '@/utils/types'
import { EVocabTrainerType } from '../enum'

export type TVocabTrainer = {
  _id: string
  nameTest: string
  statusTest: string
  duration: string
  updatedAt: string
  countTime: number
  setCountTime: number
  wordResults: TWordResults[]
}

export type TWordResults = {
  userSelect: string
  systemSelect: string
  status: string
}

export type TFormInputsVocabTrainer = {
  nameTest: string
  wordSelects: string[]
  setCountTime: number
}

export type TWordTestSelect = {
  idWord: string
  userSelect?: string
  type?: EVocabTrainerType
}

export type TFormTestVocabTrainer = {
  id: string
  duration: number
  wordTestSelects: TWordTestSelect[]
}

export type TQuestionAPI = {
  setCountTime: number
  questions: TQuestion[]
}

export type TQuestion = {
  content: string[]
  options: TOption[]
  order: number
  type: EVocabTrainerType
}
