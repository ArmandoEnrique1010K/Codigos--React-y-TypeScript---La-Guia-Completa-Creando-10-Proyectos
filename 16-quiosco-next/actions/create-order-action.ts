"use server"

import { prisma } from "@/src/lib/prisma"
import { OrderSchema } from "@/src/schema"

// Función asincrona en el servidor para crear una orden
// unknown indica que no se conoce el tipo de dato
export async function createOrder(data: unknown) {
  // Imprime en la consola del servidor
  // console.log('desde create-order-action.ts')

  // Realiza la validación con OrderSchema
  const result = OrderSchema.safeParse(data)

  // Imprime true si pasa la validación (recordar que lo imprime en el servidor)
  // console.log(result.success)

  // Devuelve los mensajes de errores si no paso la validacion
  if (!result.success) {
    return {
      errors: result.error.issues
    }
  }

  // Aqui deberia tener una función para añadir la orden
  try {
    // Imprime en la consola del servidor los datos que se pasan (la orden),
    // console.log(data)

    // Imprime lo mismo (los datos, pero validados con zod)
    // console.log(result.data)

    // El metodo de create permite guardar los datos en la tabla
    await prisma.order.create({
      data: {
        // Escribe manualmente los datos que se van a establecer
        name: result.data.name,
        total: result.data.total,

        // Itera sobre los productos que se encuentran en order
        orderProducts: {
          create: result.data.order.map(product => ({
            productId: product.id,
            quantity: product.quantity
          }))
        }
      }
    })

    // Ejecuta npx prisma studio y observa que se haya agregado un pedido a la tabla order, en orderProducts deben estar los productos que se encuentran en la orden
  } catch (error) {
    console.log(error)
  }
}

// Recuerda que se hace la validacion en el servidor, porque existen usuarios que pueden desactivar la validacion de javascript pulsando F12 y modificando los campos del formulario desde el navegador (herramientas de desarrollo)