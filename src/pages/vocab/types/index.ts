import { TOption } from '@/utils/types'

export type TExamples = {
  source: string
  target: string
}

export type TTextTarget = {
  textTarget: string
  wordType: string
  explanationSource: string
  explanationTarget: string
  vocabExamples: TExamples[]
  grammar: string
  textTargetSubjects: TOption[]
}

export type TVocab = {
  _id: string
  sourceLanguageCode: string
  targetLanguageCode: string
  textSource: string
  textTargets: TTextTarget[]
}
