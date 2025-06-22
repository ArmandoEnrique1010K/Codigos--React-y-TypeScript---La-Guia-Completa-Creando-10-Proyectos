// Store de zustand
import { create } from 'zustand'
import { OrderItem } from './types'

// Interfaz para definir los tipos de datos
interface Store {
  order: OrderItem[]
}

export const useStore = create<Store>(() => ({
  // Valores iniciales de los estados
  order: []
}))