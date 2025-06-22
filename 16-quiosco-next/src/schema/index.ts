// Importa la libreria zod con "npm i zod"
import { z } from 'zod'

// Schema para una orden
export const OrderSchema = z.object({
  // .min() es el metodo para establecer la cantidad de caracteres minimo
  name: z.string().min(1, 'Tu nombre es obligatorio'),
  total: z.number().min(1, 'Hay errores en la orden'),
  // No puedes importar un type de prisma dentro de un schema, se realiza de forma manual la asignación de tipos de datos
  order: z.array(z.object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
    subtotal: z.number(),
  }))
})

// La ventaja de zod es que el mismo mensaje de validacion se puede utilizar tanto en el cliente como en el servidor