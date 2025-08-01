
export type TExamples = {
  source: string
  target: string
}

export type TTextTargetSubject = {
    id: string
    subject: {
      id: string
      name: string
      order: number
    }
}

export type TTextTarget = {
  textTarget: string
  wordType: {
    id: string
    name: string
    description: string
  }
  explanationSource: string
  explanationTarget: string
  vocabExamples: TExamples[]
  grammar: string
  textTargetSubjects: TTextTargetSubject[]
}

export type TVocab = {
  _id: string
  sourceLanguageCode: string
  targetLanguageCode: string
  textSource: string
  textTargets: TTextTarget[]
}
