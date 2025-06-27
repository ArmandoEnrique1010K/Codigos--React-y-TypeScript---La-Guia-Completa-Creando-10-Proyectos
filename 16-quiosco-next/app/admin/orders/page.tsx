import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

async function getPendingOrders() {
  // Trae todas las ordenes, cuyo estado es false
  const orders = await prisma.order.findMany({
    where: {
      status: false,
    },

    // include sirve para traer los contenidos de la orden del usuario
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return orders;
}

// Esta pagina se vuelve asincrona
export default async function OrdersPage() {
  // Imprime en la consola del servidor las ordenes
  const orders = await getPendingOrders();
  // console.log(orders);

  // Como el campo orderProducts trae los objetos como [Object], debes convertir orders a String
  // Los parametros:  null indica que no se van a modificar los elementos y 2 indica el espaciado
  // console.log(JSON.stringify(orders, null, 2));

  // El resultado que se ve en la consola es un objeto JSON que contiene todos los datos de la orden, incluyendo los datos de los productos de la orden

  const refreshOrders = async () => {
    "use server";

    // Revalida la URL de forma manual, cuando agregas una nueva orden, de forma automatica hace un fetch
    revalidatePath("/admin/orders");
  };

  return (
    <>
      {/* Llama al componente para mostrar el titulo */}
      <Heading>Admininistrar ordenes</Heading>

      <form action={refreshOrders}></form>

      {/* Pulsa el botón para actualizar las ordenes (mientras tengas abiertos 2 pestañas: una para el quiosco y el otro para las ordenes) */}
      <input
        type="submit"
        value="Actualizar Ordenes"
        className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
      />

      {orders.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
          {
            // Itera con orders para mostrar un componente por cada orden
            orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          }
        </div>
      ) : (
        <p className="text-center">No hay ordenes pendientes</p>
      )}
    </>
  );
}
