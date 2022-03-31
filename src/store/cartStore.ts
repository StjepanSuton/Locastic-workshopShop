import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CartItem {
  id: number
  imageUrl: string
  title: string
  price: number
  quantity: number
  totalPrice: number
}

const calculateItemsQuantity = (items: CartItem[]) => {
  return items.reduce((previousValue: number, item: CartItem) => {
    return previousValue + item.quantity
  }, 0)
}

const calculateItemsPrice = (items: CartItem[]) => {
  return items.reduce((previousValue: number, item: CartItem) => {
    return previousValue + item.totalPrice
  }, 0)
}

const items: CartItem[] = []
const totalQuantity: number = 0
const totalCartPrice: number = 0
export const cartSlice = createSlice({
  name: 'cart',
  initialState: { items, totalQuantity, totalCartPrice },
  reducers: {
    addItemsToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload
      const existingItem = state.items.find((item) => item.id === newItem.id)
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          imageUrl: newItem.imageUrl,
          title: newItem.title,
          price: newItem.price,
          quantity: newItem.quantity,
          totalPrice: newItem.quantity * newItem.price,
        })
        state.totalQuantity = calculateItemsQuantity(state.items)
        state.totalCartPrice = calculateItemsPrice(state.items)
      } else {
        if (existingItem.quantity + newItem.quantity > 99) {
          existingItem.quantity = 99
          existingItem.totalPrice = newItem.price * 99
          state.totalQuantity = calculateItemsQuantity(state.items)
          state.totalCartPrice = calculateItemsPrice(state.items)
        } else {
          existingItem.quantity = existingItem.quantity + newItem.quantity
          existingItem.totalPrice = existingItem.totalPrice + newItem.totalPrice
          state.totalQuantity = calculateItemsQuantity(state.items)
          state.totalCartPrice = calculateItemsPrice(state.items)
        }
      }
    },
    changeItemQuantity: (state, action: PayloadAction<CartItem>) => {
      const newEntry = action.payload
      const existingEntry = state.items.find((item) => item.id === newEntry.id)
      existingEntry!.quantity = newEntry.quantity
      existingEntry!.totalPrice = newEntry.totalPrice
      state.totalQuantity = calculateItemsQuantity(state.items)
      state.totalCartPrice = calculateItemsPrice(state.items)
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      const id = action.payload
      state.items = state.items.filter((item) => item.id !== id)
      state.totalQuantity = calculateItemsQuantity(state.items)
      state.totalCartPrice = calculateItemsPrice(state.items)
    },
    removeAllItems: (state) => {
      state.items = []
      state.totalQuantity = 0
      state.totalCartPrice = 0
    },
  },
})

export const cartActions = cartSlice.actions

export default cartSlice
