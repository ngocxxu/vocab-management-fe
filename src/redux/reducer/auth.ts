import { createSlice } from '@reduxjs/toolkit'

type TInitialStateDashboard = {
  accessToken: string | null
}

const initialState: TInitialStateDashboard = {
  accessToken: null
}

const authReducer = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload
    },
    clearAccessToken: (state) => {
      state.accessToken = null
    }
  }
})
const { actions, reducer } = authReducer
export const { setAccessToken, clearAccessToken } = actions
export default reducer
