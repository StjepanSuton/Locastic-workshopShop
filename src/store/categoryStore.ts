import { createSlice, PayloadAction } from '@reduxjs/toolkit'
const storage = localStorage.getItem('locastic-workShop-category')
const initialState: string = storage === null ? 'all' : JSON.parse(storage)

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
