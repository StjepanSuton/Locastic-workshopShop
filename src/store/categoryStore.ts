import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Category {
  selectedCategory: string
  categorysShowing: number
}

const DEFAULT_CATEGORY = 'all'

const initialState: Category = {
  selectedCategory: DEFAULT_CATEGORY,
  categorysShowing: 9,
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    selectCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload
    },
    shownCategory: (state, action: PayloadAction<number>) => {
      state.categorysShowing = state.categorysShowing + action.payload
    },
  },
})

export const categoryActions = categorySlice.actions
