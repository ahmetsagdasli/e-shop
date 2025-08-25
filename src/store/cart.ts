import { create } from 'zustand'
import type { CartItem, Product } from '../types'

interface CartState {
  cart: CartItem[]
  wishlist: Product[]
  addToCart: (p: Product, qty?: number) => void
  removeFromCart: (id: string) => void
  setQty: (id: string, qty: number) => void
  clearCart: () => void
  addToWishlist: (p: Product) => void
  removeFromWishlist: (id: string) => void
}

const persistKey = 'ecom-state-v1'

const load = (): Pick<CartState, 'cart' | 'wishlist'> => {
  try {
    const raw = localStorage.getItem(persistKey)
    if (!raw) return { cart: [], wishlist: [] }
    return JSON.parse(raw)
  } catch {
    return { cart: [], wishlist: [] }
  }
}

const save = (state: Pick<CartState, 'cart' | 'wishlist'>) => {
  localStorage.setItem(persistKey, JSON.stringify(state))
}

export const useCart = create<CartState>((set, get) => ({
  cart: load().cart,
  wishlist: load().wishlist,
  addToCart: (p, qty = 1) => set(() => {
    const { cart, wishlist } = get()
    const i = cart.findIndex(ci => ci.product.id === p.id)
    let next: CartItem[]
    if (i >= 0) {
      next = cart.map(ci => ci.product.id === p.id ? { ...ci, qty: ci.qty + qty } : ci)
    } else {
      next = [...cart, { product: p, qty }]
    }
    const state = { cart: next, wishlist }
    save(state)
    return state
  }),
  removeFromCart: (id) => set(() => {
    const { cart, wishlist } = get()
    const next = cart.filter(ci => ci.product.id !== id)
    const state = { cart: next, wishlist }
    save(state)
    return state
  }),
  setQty: (id, qty) => set(() => {
    const { cart, wishlist } = get()
    const next = cart.map(ci => ci.product.id === id ? { ...ci, qty } : ci).filter(ci => ci.qty > 0)
    const state = { cart: next, wishlist }
    save(state)
    return state
  }),
  clearCart: () => set(() => {
    const { wishlist } = get()
    const state = { cart: [], wishlist }
    save(state)
    return state
  }),
  addToWishlist: (p) => set(() => {
    const { cart, wishlist } = get()
    if (wishlist.some(w => w.id === p.id)) return { cart, wishlist }
    const state = { cart, wishlist: [...wishlist, p] }
    save(state)
    return state
  }),
  removeFromWishlist: (id) => set(() => {
    const { cart, wishlist } = get()
    const state = { cart, wishlist: wishlist.filter(w => w.id !== id) }
    save(state)
    return state
  })
}))
