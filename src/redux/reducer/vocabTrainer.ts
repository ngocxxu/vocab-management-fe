import { TFormInputsFilter } from '@/pages/vocab-trainer/components/toolBar';
import { TVocabTrainer } from '@/pages/vocab-trainer/types';
import { defaultStatus } from '@/utils/constants';
import { createSlice } from '@reduxjs/toolkit';
import { RowSelectionState } from '@tanstack/react-table';

type TInitialStateVocabTrainer = {
  rowSelectionState: RowSelectionState;
  isOpenModalState: boolean;
  itemVocabTrainer: TVocabTrainer;
  searchVocabTrainer: string;
  filterData: TFormInputsFilter;
};

const initialState: TInitialStateVocabTrainer = {
  rowSelectionState: {},
  isOpenModalState: false,
  itemVocabTrainer: {
    _id: '',
    nameTest: '',
    statusTest: '',
    duration: '',
    updatedAt: '',
    countTime: 0,
    wordResults: [],
  },
  searchVocabTrainer: '',
  filterData: {
    status: defaultStatus,
  },
};

const vocabTrainerReducer = createSlice({
  name: 'vocabTrainerReducer',
  initialState,
  reducers: {
    setOpenModalState(state, action) {
      state.isOpenModalState = action.payload;
    },
    setRowSelectionState(state, action) {
      state.rowSelectionState = action.payload;
    },
    setItemVocabTrainerState(state, action) {
      state.itemVocabTrainer = action.payload;
    },
    setSearchVocabState(state, action) {
      state.searchVocabTrainer = action.payload;
    },
    setFilterVocabTrainerState(state, action) {
      state.filterData = action.payload;
    },
    resetFilterVocabTrainerState(state) {
      state.searchVocabTrainer = '';
      state.filterData = {
        status: defaultStatus,
      };
    },
  },
});
const { actions, reducer } = vocabTrainerReducer;
export const {
  setRowSelectionState,
  setOpenModalState,
  setItemVocabTrainerState,
  setSearchVocabState,
  setFilterVocabTrainerState,
  resetFilterVocabTrainerState
} = actions;
export default reducer;
