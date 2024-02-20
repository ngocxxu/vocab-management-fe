import { createSlice } from "@reduxjs/toolkit";
import { RowSelectionState } from "@tanstack/react-table";

type TInitialStateGlobal = {
  rowSelectionState: RowSelectionState;
};

const initialState: TInitialStateGlobal = {
  rowSelectionState: {},
};

const globalReducer = createSlice({
  name: "globalReducer",
  initialState,
  reducers: {
    setRowSelectionState(state, action) {
      state.rowSelectionState = action.payload;
    },
  },
});
const { actions, reducer } = globalReducer;
export const { setRowSelectionState } = actions;
export default reducer;
