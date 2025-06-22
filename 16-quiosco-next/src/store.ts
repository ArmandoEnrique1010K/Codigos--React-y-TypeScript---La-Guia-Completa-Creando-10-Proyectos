// Store de zustand
import { create } from 'zustand'
import { OrderItem } from './types'
import { Product } from '@prisma/client'

// Interfaz para definir los tipos de datos
interface Store {
  order: OrderItem[]
  addToOrder: (product: Product) => void
}

// Llama a la función set para escribir en el state
export const useStore = create<Store>((set) => ({
  // Valores iniciales de los estados
  order: [],

  // Función para agregar a la orden un producto
  addToOrder: (product) => {

    // Al imprimir el product, se tiene un objeto con propiedades innecesarias del producto como categoryId e image
    // console.log('Agregando', product)

    // Desestructura las propieades de product, utiliza el operador rest para tomar los demás propiedades necesarias
    const { categoryId, image, ...data } = product

    // Imprime las propiedades necesarias
    // console.log(data);

    set((state) => ({
      // Se necesita escribir en el state de order las propieades quantity y subtotal
      order: [...state.order, {
        ...data,
        quantity: 1,
        subtotal: 1 * product.price
      }]
    }))
  }
}))