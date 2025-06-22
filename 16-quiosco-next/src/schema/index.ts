// Importa la libreria zod con "npm i zod"
import { z } from 'zod'

// Schema para una orden
export const OrderSchema = z.object({
  // .min() es el metodo para establecer la cantidad de caracteres minimo
  name: z.string().min(1, 'Tu nombre es obligatorio')
})

// La ventaja de zod es que el mismo mensaje de validacion se puede utilizar tanto en el cliente como en el servidor