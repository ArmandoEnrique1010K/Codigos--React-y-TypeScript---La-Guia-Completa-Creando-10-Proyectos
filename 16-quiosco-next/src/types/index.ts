// Crea los types personalizados (lo que Prisma no puede crear por defecto)
import { Product } from "@/app/generated/prisma";

// Type para la orden
export type OrderItem = Pick<Product, 'id' | 'name' | 'price'> & {
  quantity: number
  subtotal: number
}
