import { createSlice } from "@reduxjs/toolkit";
import { RowSelectionState } from "@tanstack/react-table";

type TInitialStateVocabTrainer = {
  rowSelectionState: RowSelectionState;
  isOpenModalState: boolean;
};

const initialState: TInitialStateVocabTrainer = {
  rowSelectionState: {},
  isOpenModalState: false,
};

const vocabTrainerReducer = createSlice({
  name: "vocabTrainerReducer",
  initialState,
  reducers: {
    setOpenModalState(state, action) {
      state.isOpenModalState = action.payload;
    },
    setRowSelectionState(state, action) {
      state.rowSelectionState = action.payload;
    },
  },
});
const { actions, reducer } = vocabTrainerReducer;
export const { setRowSelectionState, setOpenModalState } = actions;
export default reducer;
