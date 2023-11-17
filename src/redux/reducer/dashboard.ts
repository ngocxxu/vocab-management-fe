import { createSlice } from '@reduxjs/toolkit';

type TInitialStateDashboard = {
  toggle: boolean;
};

const initialState: TInitialStateDashboard = {
  toggle: false,
};

const dashboardReducer = createSlice({
  name: 'dashboardReducer',
  initialState,
  reducers: {
    toggleDashboard(state, action) {
      state.toggle = !action;
    },
  },
});
const { actions, reducer } = dashboardReducer;
export const { toggleDashboard } = actions;
export default reducer;
