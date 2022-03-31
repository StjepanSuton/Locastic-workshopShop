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

const setLocalStorage = (items: CartItem[], totalQuantity: number, totalCartPrice: number) => {
  localStorage.setItem('locastic-workShop-items', JSON.stringify(items))
  localStorage.setItem('locastic-workShop-totalQuantity', JSON.stringify(totalQuantity))
  localStorage.setItem('locastic-workShop-totalCartPrice', JSON.stringify(totalCartPrice))
}

const itemsStorage = localStorage.getItem('locastic-workShop-items')
const totalQuantityStorage = localStorage.getItem('locastic-workShop-totalQuantity')
const totalCartPriceStorage = localStorage.getItem('locastic-workShop-totalCartPrice')
const items: CartItem[] = itemsStorage === null ? [] : JSON.parse(itemsStorage)
const totalQuantity: number = totalQuantityStorage === null ? 0 : parseFloat(totalQuantityStorage)
const totalCartPrice: number = totalCartPriceStorage === null ? 0 : parseFloat(totalCartPriceStorage)
const toManyitems: boolean = false

export const cartSlice = createSlice({
  name: 'cart',
  initialState: { items, totalQuantity, totalCartPrice, toManyitems },
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
        setLocalStorage(state.items, state.totalQuantity, state.totalCartPrice)
      } else {
        if (existingItem.quantity + newItem.quantity > 99) {
          state.toManyitems = true
          existingItem.quantity = 99
          existingItem.totalPrice = newItem.price * 99
          state.totalQuantity = calculateItemsQuantity(state.items)
          state.totalCartPrice = calculateItemsPrice(state.items)
          setLocalStorage(state.items, state.totalQuantity, state.totalCartPrice)
        } else {
          existingItem.quantity = existingItem.quantity + newItem.quantity
          existingItem.totalPrice = existingItem.totalPrice + newItem.totalPrice
          state.totalQuantity = calculateItemsQuantity(state.items)
          state.totalCartPrice = calculateItemsPrice(state.items)
          setLocalStorage(state.items, state.totalQuantity, state.totalCartPrice)
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
      setLocalStorage(state.items, state.totalQuantity, state.totalCartPrice)
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      const id = action.payload
      state.items = state.items.filter((item) => item.id !== id)
      state.totalQuantity = calculateItemsQuantity(state.items)
      state.totalCartPrice = calculateItemsPrice(state.items)
      setLocalStorage(state.items, state.totalQuantity, state.totalCartPrice)
    },
    removeAllItems: (state) => {
      state.items = []
      state.totalQuantity = 0
      state.totalCartPrice = 0
      setLocalStorage(state.items, state.totalQuantity, state.totalCartPrice)
    },
    resetToManyitems: (state) => {
      state.toManyitems = false
    },
  },
})

export const cartActions = cartSlice.actions

export default cartSlice
