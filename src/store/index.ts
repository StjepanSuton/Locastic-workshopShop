import { configureStore } from '@reduxjs/toolkit'
import { categorySlice } from './categoryStore'
import cartSlice from './cartStore'
import { uiSlice } from './uiStore'

const store = configureStore({
  reducer: {
    categorys: categorySlice.reducer,
    cart: cartSlice.reducer,
    id: uiSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export const selectCategorys = (state: RootState) => state

export default store
