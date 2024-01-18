import { createSlice } from "@reduxjs/toolkit";

type TItemsShow = {
  idRow: string;
  idxExample: number;
};

type TInitialStateVocab = {
  idVocabState: string;
  idsState: string[];
  isToggle: boolean;
  itemsShow: TItemsShow[];
};

const initialState: TInitialStateVocab = {
  idVocabState: "",
  idsState: [],
  isToggle: false,
  itemsShow: [],
};

const vocabReducer = createSlice({
  name: "vocabReducer",
  initialState,
  reducers: {
    setIdVocabState(state, action) {
      state.idVocabState = action.payload;
    },
    toggleState(state, action) {
      const { id } = action.payload;
      if (!state.idsState.includes(id)) {
        state.idsState = [...state.idsState, id];
      } else {
        state.idsState = state.idsState.filter((item) => item !== id);
      }
    },
    setItemsShowState(state, action) {
      const { idRow, idxExample } = action.payload;
      if (
        state.itemsShow.find(
          (item) => item.idRow === idRow && item.idxExample === idxExample
        )
      ) {
        // Delete item
        state.itemsShow = state.itemsShow.filter(
          (item) =>
            (item.idRow === idRow && item.idxExample !== idxExample) ||
            (item.idRow !== idRow && item.idxExample !== idxExample) ||
            (item.idRow !== idRow && item.idxExample === idxExample)
        );
      } else {
        // Add item
        state.itemsShow = [
          ...state.itemsShow,
          {
            idRow,
            idxExample,
          },
        ];
      }
    },
  },
});
const { actions, reducer } = vocabReducer;
export const { toggleState, setItemsShowState, setIdVocabState } = actions;
export default reducer;
