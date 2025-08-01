import { TFormInputsFilter } from '@/pages/vocab-trainer/components/toolBar'
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
    nameTest: '',
    statusTest: '',
    duration: '',
    updatedAt: '',
    countTime: 0,
    setCountTime: DEFAULT_COUNTDOWN,
    wordResults: []
  },
  searchVocabTrainer: '',
  orderQuestion: 1,
  filterData: {
    status: defaultStatus
  }
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
    setSearchVocabState(state, action) {
      state.searchVocabTrainer = action.payload
    },
    setFilterVocabTrainerState(state, action) {
      state.filterData = action.payload
    },
    resetFilterVocabTrainerState(state) {
      state.searchVocabTrainer = ''
      state.filterData = {
        status: defaultStatus
      }
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
  setSearchVocabState,
  setFilterVocabTrainerState,
  resetFilterVocabTrainerState,
  setOrderQuestion
} = actions
export default reducer
