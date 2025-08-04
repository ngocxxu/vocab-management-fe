import { TFormInputsFilter } from '@/pages/vocab-trainer/components/toolBar'
import { EQuestionType } from '@/pages/vocab-trainer/enum'
import { TVocabTrainer } from '@/pages/vocab-trainer/types'
import { DEFAULT_COUNTDOWN, defaultStatus } from '@/utils/constants'
import { createSlice } from '@reduxjs/toolkit'
import { RowSelectionState } from '@tanstack/react-table'

type TInitialStateVocabTrainer = {
  rowSelectionState: RowSelectionState
  isOpenModalState: boolean
  itemVocabTrainer: TVocabTrainer
  searchVocabTrainer: string
  filterData: TFormInputsFilter
  orderQuestion: number
}

const initialState: TInitialStateVocabTrainer = {
  rowSelectionState: {},
  isOpenModalState: false,
  itemVocabTrainer: {
    id: '',
    name: '',
    status: '',
    questionType: EQuestionType.MULTIPLE_CHOICE,
    reminderTime: 0,
    countTime: 0,
    setCountTime: DEFAULT_COUNTDOWN,
    reminderDisabled: false,
    reminderRepeat: 0,
    reminderLastRemind: '',
    userId: '',
    vocabAssignments: [],
    results: [],
    questions: [],
    createdAt: '',
    updatedAt: ''
  },
  searchVocabTrainer: '',
  orderQuestion: 1,
  filterData: { status: defaultStatus }
}

const vocabTrainerReducer = createSlice({
  name: 'vocabTrainerReducer',
  initialState,
  reducers: {
    setOpenModalState(state, action) {
      state.isOpenModalState = action.payload
    },
    setRowSelectionState(state, action) {
      state.rowSelectionState = action.payload
    },
    setItemVocabTrainerState(state, action) {
      state.itemVocabTrainer = action.payload
    },
    setSearchVocabTrainerState(state, action) {
      state.searchVocabTrainer = action.payload
    },
    setFilterVocabTrainerState(state, action) {
      state.filterData = action.payload
    },
    resetFilterVocabTrainerState(state) {
      state.searchVocabTrainer = ''
      state.filterData = { status: defaultStatus }
    },
    setOrderQuestion(state, action) {
      state.orderQuestion = action.payload
    }
  }
})
const { actions, reducer } = vocabTrainerReducer
export const {
  setRowSelectionState,
  setOpenModalState,
  setItemVocabTrainerState,
  setSearchVocabTrainerState,
  setFilterVocabTrainerState,
  resetFilterVocabTrainerState,
  setOrderQuestion
} = actions
export default reducer
