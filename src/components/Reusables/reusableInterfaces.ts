export interface Item {
  id: number
  imageUrl: string
  price: number
  title: string
  quantity: number
  totalPrice: number
}
export interface WorkshopData {
  category: string
  date: string
  desc: string
  id: number
  imageUrl: string
  price: number
  title: string
  userId: number
}
export interface UserData {
  email: string
  id: number
  name: string
  password: string
}
