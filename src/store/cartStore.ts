import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'

interface CartItem {
  id: number
  imageUrl: string
  title: string
  price: number
  quantity: number
  totalPrice: number
}

const storage = localStorage.getItem('locastic-workShop-items')
const items: CartItem[] = storage === null ? [] : JSON.parse(storage)
const totalQuantity: number = 0
const totalCartPrice: number = 0
export const cartSlice = createSlice({
  name: 'cart',
  initialState: { items, totalQuantity, totalCartPrice },
  reducers: {
    addItemsToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload
      const existingItem = state.items.find((item) => item.id === newItem.id)
      state.totalQuantity++
      state.totalCartPrice = state.totalCartPrice + newItem.price
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          imageUrl: newItem.imageUrl,
          title: newItem.title,
          price: newItem.price,
          quantity: newItem.quantity,
          totalPrice: newItem.price,
        })
      } else {
        existingItem.quantity++
        existingItem.totalPrice = existingItem.totalPrice + newItem.totalPrice
      }
    },
    changeItemQuantity: (state, action: PayloadAction<CartItem>) => {
      const newEntry = action.payload
      const existingEntry = state.items.find((item) => item.id === newEntry.id)
      existingEntry!.quantity = newEntry.quantity
      existingEntry!.totalPrice = existingEntry!.totalPrice + newEntry.totalPrice
      state.totalQuantity = state.items.reduce((previousValue: number, item: CartItem) => {
        return previousValue + item.quantity
      }, 0)
      state.totalCartPrice = state.items.reduce((previousValue: number, item: CartItem) => {
        return previousValue + item.totalPrice
      }, 0)
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      const id = action.payload
      state.items = state.items.filter((item) => item.id !== id)
      state.totalQuantity = state.items.reduce((previousValue: number, item: CartItem) => {
        return previousValue + item.quantity
      }, 0)
      state.totalCartPrice = state.items.reduce((previousValue: number, item: CartItem) => {
        return previousValue + item.totalPrice
      }, 0)
    },
  },
})

export const cartActions = cartSlice.actions

export default cartSlice
