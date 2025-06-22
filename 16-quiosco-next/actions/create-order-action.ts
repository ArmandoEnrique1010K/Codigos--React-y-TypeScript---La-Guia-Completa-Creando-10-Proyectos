"use server"

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

  } catch (error) {
    console.log(error)
  }
}

// Recuerda que se hace la validacion en el servidor, porque existen usuarios que pueden desactivar la validacion de javascript pulsando F12 y modificando los campos del formulario desde el navegador (herramientas de desarrollo)