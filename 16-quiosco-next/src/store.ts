// Store de zustand
import { create } from 'zustand'
import { OrderItem } from './types'
import { Product } from '@prisma/client'

// Interfaz para definir los tipos de datos
interface Store {
  order: OrderItem[]
  addToOrder: (product: Product) => void
  increaseQuantity: (id: Product['id']) => void
  decreaseQuantity: (id: Product['id']) => void
  removeItem: (id: Product['id']) => void
  clearOrder: () => void
}

// Llama a la función set para escribir en el state
export const useStore = create<Store>((set, get) => ({
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

    // Para no tener 2 funciones set, se declara una variable order para almacenar la orden
    let order: OrderItem[] = []

    // Condición que revisa si el elemento que fue agregado ya se encuentra en el carrito
    if (get().order.find(item => item.id === product.id)) {
      order = get().order.map(item => item.id === product.id ? {
        // Si esta en el carrito, solamente modifica los campos quantity y subtotal, manteniendo los demás items tal y como esta
        ...item,
        quantity: item.quantity + 1,
        subtotal: item.price * (item.quantity + 1)
      } : item)
    } else {
      // Si no esta en el carrito...
      // Se necesita escribir en el state de order las propieades quantity y subtotal
      order = [...get().order, {
        ...data,
        quantity: 1,
        subtotal: 1 * product.price
      }]
    }

    // Modifica el state de order
    set(() => ({
      // order: state.order
      order
    }))
  },

  // Función para incrementar la cantidad de un producto en el carrito
  increaseQuantity: (id) => {
    set((state) => ({
      order: state.order.map(item => item.id === id ? {
        ...item,
        quantity: item.quantity + 1,
        subtotal: item.price * (item.quantity + 1)
      } : item)
    }))
  },

  // Función para decrementar la cantidad de un producto en el carrito
  decreaseQuantity: (id) => {

    // En este caso se crea una constante para actualizar el state de order antes de establecerlo en la función set
    const order = get().order.map(item => item.id === id ? {
      ...item,
      quantity: item.quantity - 1,
      subtotal: item.price * (item.quantity - 1)
    } : item)

    set(() => ({
      order
    }))
  },

  // Eliminar un producto del carrito 
  removeItem: (id) => {
    // Se realiza la verificacion dentro del set, elimina el producto de la orden
    set((state) => ({
      order: state.order.filter(item => item.id !== id)
    }))
  },

  // Función para limpiar la orden
  clearOrder: () => {
    set(() => ({
      order: []
    }))
  }
}))