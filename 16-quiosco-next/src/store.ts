// Store de zustand
import { create } from 'zustand'
import { OrderItem } from './types'
import { Product } from '@prisma/client'

// Interfaz para definir los tipos de datos
interface Store {
  order: OrderItem[]
  addToOrder: (product: Product) => void
}

export const useStore = create<Store>(() => ({
  // Valores iniciales de los estados
  order: [],

  // Función para agregar a la orden un producto
  addToOrder: (product) => {
    console.log('Agregando', product)
  }
}))