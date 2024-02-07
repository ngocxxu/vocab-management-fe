import { TFormInputsFilter } from '@/pages/vocab/components/toolBar';
import { TVocab } from '@/pages/vocab/types';
import { defaultStatus } from '@/utils/constants';
import { createSlice } from '@reduxjs/toolkit';

type TItemsShow = {
  idRow: string;
  idxExample: number;
};

type TInitialStateVocab = {
  itemVocab: TVocab;
  idVocabState: string;
  idsState: string[];
  isToggle: boolean;
  itemsShow: TItemsShow[];
  filterData: TFormInputsFilter;
  searchVocab: string;
};

const initialState: TInitialStateVocab = {
  itemVocab: {
    _id: '',
    sourceLanguage: '',
    targetLanguage: '',
    textSource: '',
    textTarget: [],
  },
  idVocabState: '',
  idsState: [],
  isToggle: false,
  itemsShow: [],
  filterData: {
    subject: [],
    status: defaultStatus,
  },
  searchVocab: '',
};

const vocabReducer = createSlice({
  name: 'vocabReducer',
  initialState,
  reducers: {
    resetFilterState(state) {
      state.searchVocab = '';
      state.filterData = {
        subject: [],
        status: defaultStatus,
      };
    },
    setSearchVocabState(state, action) {
      state.searchVocab = action.payload;
    },
    setFilterVocabState(state, action) {
      state.filterData = action.payload;
    },
    setItemVocabState(state, action) {
      state.itemVocab = action.payload;
    },
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
export const {
  toggleState,
  setItemsShowState,
  setIdVocabState,
  setItemVocabState,
  setFilterVocabState,
  setSearchVocabState,
  resetFilterState,
} = actions;
export default reducer;
