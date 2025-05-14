import { create } from 'zustand'

const useStore = create((set) => ({
  cart: [],
  addToCart: (product) => 
    set((state) => ({
      cart: [...state.cart, { ...product, id: Date.now() }]
    })),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId)
    })),
  clearCart: () => set({ cart: [] }),
}))

export { useStore }