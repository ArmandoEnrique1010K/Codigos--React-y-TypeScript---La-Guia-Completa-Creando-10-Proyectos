// Crea los types personalizados (lo que Prisma no puede crear por defecto)
import { Order, OrderProducts, Product } from "@prisma/client";

// Type para la orden
export type OrderItem = Pick<Product, 'id' | 'name' | 'price'> & {
  quantity: number
  subtotal: number
}

// Type para una orden con productos (se asignan los types de prisma), es el type de Order y se asigna la propiedad orderProducts, que es de tipo arreglo
export type OrderWithProducts = Order & {
  orderProducts: (OrderProducts & {
    product: Product
  })[]
}