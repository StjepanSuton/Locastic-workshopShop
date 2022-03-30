import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = ''

export const uiSlice = createSlice({
  name: 'uiSlice',
  initialState,
  reducers: {
    setScrollTarget: (state, action: PayloadAction<string>) => {
      return (state = action.payload)
    },
  },
})

export const uiActions = uiSlice.actions
