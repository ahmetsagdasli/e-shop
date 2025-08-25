export type Category = 'Electronics' | 'Fashion' | 'Home' | 'Sports' | 'Beauty'

export interface Product {
  id: string
  name: string
  brand: string
  price: number
  rating: number
  image: string
  category: Category
  stock: number
  description: string
  colors?: string[]
  tags?: string[]
}

export interface CartItem {
  product: Product
  qty: number
}
