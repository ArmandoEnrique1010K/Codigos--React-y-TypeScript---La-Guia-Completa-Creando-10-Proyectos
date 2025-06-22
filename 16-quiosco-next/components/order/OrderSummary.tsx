// Los hooks de react funcionan solamente en componentes de cliente de Nextjs
"use client";

import { useStore } from "@/src/store";
import ProductDetails from "./ProductDetails";
import { useMemo } from "react";
import { formatCurrency } from "@/src/utils";
import { createOrder } from "@/actions/create-order-action";

export default function OrderSummary() {
  // Trae el state de order, asegurate que sea el del store, no el de zustand
  const order = useStore((state) => state.order);

  // Calcula el total a pagar con la función reduce
  const total = useMemo(
    () => order.reduce((total, item) => total + item.quantity * item.price, 0),
    [order]
  );

  // Función para crear la orden (asigna el interface FormData al parametro formData, ya viene incluido en TypeScript )
  const handleCreateOrder = (formData: FormData) => {
    // Si colocas use server aqui, no va a funcionar, solamente funciona en componentes de cliente (en la primera linea de codigo)
    // "use server"
    // La solución es crear un archivo aparte, en este caso, en la carpeta actions (en la raiz del proyecto) y dentro de ella un archivo .ts

    // Imprime en la consola del navegador (es un componente de cliente)
    // console.log("Desde handleCreateOrder");

    // Llama a la función createOrder (componente de servidor)
    createOrder();

    // Imprime formData, se obtiene un objeto
    // console.log(formData);

    // Obtiene el valor escrito en el campo name (valor escrito en el atributo name, en este caso, nombre del usuario)
    console.log(formData.get("name"));
  };

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">Mi pedido</h1>

      {/*  Verifica si hay elementos en el state de order */}
      {order.length === 0 ? (
        <p className="text-center my-10">El pedido esta vacio</p>
      ) : (
        <div className="mt-5">
          {/* Itera sobre la orden */}
          {order.map((item) => (
            <ProductDetails key={item.id} item={item} />
          ))}

          <p className="text-2xl mt-20 text-center">
            Total a pagar: {""}
            <span className="font-bold">{formatCurrency(total)}</span>
          </p>

          {/* Boton para enviar el pedido, previamente en React se utilizaba React Query, en NextJS se hace de otra forma utilizando action (ultima version de Next.js), coloca el atributo action con una función */}
          <form className="w-full mt-10 space-y-5" action={handleCreateOrder}>
            <input
              type="text"
              placeholder="Tu Nombre"
              className="bg-white border border-gray-100 p-2 w-full"
              // Añade la propiedad name
              name="name"
            />
            <input
              type="submit"
              className="py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold"
              value="Confirmar pedido"
            />

            {/* En NextJs con los actions no es necesario colocar los valores del formulario en el state, para recuperar los valores en la función, se hace colocando un atributo data y en la función handleCreateOrden automaticamente se pasa un argumento llamado formData, contiene los datos ingresados en el formulario 
            
            (similar a la forma en que se hizo antiguamente en el desarrollo web de hace 20 años) */}
          </form>
        </div>
      )}
    </aside>
  );
}
