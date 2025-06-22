// Importa la libreria zod con "npm i zod"
import { z } from 'zod'

// Schema para una orden
export const OrderSchema = z.object({
  // .min() es el metodo para establecer la cantidad de caracteres minimo
  name: z.string().min(1, 'Tu nombre es obligatorio')
})