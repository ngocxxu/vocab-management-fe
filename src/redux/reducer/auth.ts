import { createSlice } from '@reduxjs/toolkit'

type TInitialStateDashboard = {
  accessToken: string | null
  userInfo: {
    name: string,
    email: string
  }
}

const initialState: TInitialStateDashboard = {
  accessToken: null,
  userInfo: {
    name: '',
    email: ''
  }
}

const authReducer = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
    clearAccessToken: (state) => {
      state.accessToken = null
    }
  }
})
const { actions, reducer } = authReducer
export const { setAccessToken, clearAccessToken, setUserInfo } = actions
export default reducer
