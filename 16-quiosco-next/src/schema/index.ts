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


// Puedes realizar la transformación de string a number con zod, tambien valida con refine si el valor transformado es mayor que 0, de lo contrario muestra un mensaje
export const OrderIdSchema = z.object({
  orderId: z.string().transform((value) => parseInt(value)).refine(value => value > 0, { message: 'Hay errores' })
})

// Schema para el formulario de busqueda
export const SearchSchema = z.object({
  // Elimina los espacios en blanco por demás y debe tener al menos 1 caracter
  search: z.string().trim().min(1, { message: 'La busqueda no puede ir vacia' })
})


// Schema de un producto (al momento de agregar uno nuevo desde el formulario)
export const ProductSchema = z.object({
  name: z.string()
    .trim()
    .min(1, { message: 'El Nombre del Producto no puede ir vacio' }),
  price: z.string()
    .trim()
    .transform((value) => parseFloat(value))
    .refine((value) => value > 0, { message: 'Precio no válido' })
    .or(z.number().min(1, { message: 'La Categoría es Obligatoria' })),
  categoryId: z.string()
    .trim()
    .transform((value) => parseInt(value))
    .refine((value) => value > 0, { message: 'La Categoría es Obligatoria' })
    .or(z.number().min(1, { message: 'La Categoría es Obligatoria' })),
  // Añade el campo image
  image: z.string().min(1, { message: 'La Imagen es obligatoria' })
})