"use server"
import { revalidatePath } from "next/cache"
import { prisma } from "@/src/lib/prisma";
import { OrderIdSchema } from "@/src/schema";

// A una acción, siempre va a ser un componente de servidor
// Automaticamente pasa formData (los datos enviados del formulario)
export async function completeOrder(formData: FormData) {

  // console.log("desde completeOrder");

  // Imprime el id de la orden
  // console.log(formData.get('order_id'))

  // Coloca un ! para establecer que nunca sera null el valor recibido
  // const orderId = formData.get('order_id')!;

  const data = {
    orderId: formData.get('order_id')
  }
  const result = OrderIdSchema.safeParse(data)

  if (result.success) {
    try {
      // Utiliza update para actualizar un registro de order, where especifica una condición
      await prisma.order.update({
        where: {
          //id: +orderId
          id: result.data.orderId
        },
        // Actualiza los campos
        data: {
          status: true,
          orderReadyAt: new Date(Date.now())
        }
      })

      // Revalida los datos (solamente un refetch) solamente obtiene datos actualizados sin necesidad de pulsar F5 en el navegador
      revalidatePath('/admin/orders')

      // Haz clic en "Marcar Orden Completada" y veras que la orden desparece de la vista, porque se actualiza la base de datos (marca la orden como completa) y solamente en el navegador se muestran las ordenes incompletas
    } catch (error) {
      console.log(error)
    }
  }
}

// En el navegador, haz clic en el boton de una orden y luego ve a http://localhost:5555/ para ver los registros y notaras que el campo status esta en true y se asigna la fecha de hoy en orderReadyAt