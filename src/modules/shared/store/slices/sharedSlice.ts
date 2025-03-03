import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SharedState {
  isSidebarCollapsed: boolean
}

const initialState: SharedState = {
  isSidebarCollapsed: false,
}

interface DataHandleChangeProps<T extends keyof SharedState> {
  key: T
  value: SharedState[T]
}

export const sharedSlice = createSlice({
  name: 'shared',
  initialState,
  reducers: {
    SharedSwitchValue: (state, action: PayloadAction<DataHandleChangeProps<keyof SharedState>>) => {
      const { key, value } = action.payload
      state[key] = value
    },
  },
})

export default sharedSlice.reducer

export const { SharedSwitchValue } = sharedSlice.actions
