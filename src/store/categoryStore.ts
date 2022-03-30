import { createSlice, PayloadAction } from '@reduxjs/toolkit'
const storage = localStorage.getItem('locastic-workShop-category')

const DEFAULT_CATEGORY = 'all'

const initialState: string = storage === null ? DEFAULT_CATEGORY : JSON.parse(storage)

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    selectCategory: (state, action: PayloadAction<string>) => {
      return (state = action.payload)
    },
  },
})

export const { selectCategory } = categorySlice.actions
