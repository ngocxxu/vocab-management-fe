import { createSlice } from '@reduxjs/toolkit';
import { RowSelectionState } from '@tanstack/react-table';

type TInitialStateVocab = {
  rowSelectionState: RowSelectionState;
};

const initialState: TInitialStateVocab = {
  rowSelectionState: {},
};

const vocabTrainerReducer = createSlice({
  name: 'vocabTrainerReducer',
  initialState,
  reducers: {
    setRowSelectionState(state, action) {
      state.rowSelectionState = action.payload;
    },
  },
});
const { actions, reducer } = vocabTrainerReducer;
export const { setRowSelectionState } = actions;
export default reducer;
