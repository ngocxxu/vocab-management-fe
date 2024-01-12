import { createSlice } from "@reduxjs/toolkit";

type TInitialStateVocab = {
  idsState: string[];
  isToggle: boolean;
};

const initialState: TInitialStateVocab = {
  idsState: [],
  isToggle: false,
};

const vocabReducer = createSlice({
  name: "vocabReducer",
  initialState,
  reducers: {
    toggleState(state, action) {
      if (!state.idsState.includes(action.payload.id)) {
        state.idsState = [...state.idsState, action.payload.id];
      } else {
        state.idsState = state.idsState.filter(
          (item) => item !== action.payload.id
        );
      }
    },
  },
});
const { actions, reducer } = vocabReducer;
export const { toggleState } = actions;
export default reducer;
