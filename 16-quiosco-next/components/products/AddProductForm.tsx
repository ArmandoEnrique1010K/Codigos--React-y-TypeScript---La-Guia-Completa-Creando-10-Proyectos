// No olvidar colocar use client para que se convierta en un componente de cliente de nextjs
"use client";

import { ProductSchema } from "@/src/schema";
import { toast } from "react-toastify";

// Este formulario contiene la logica de agregar un producto
// React.ReactNode sirve para pasarle un componente de cliente o servidor
export default function AddProductForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleSubmit = async (formData: FormData) => {
    // "use server";

    // Las validaciones seran con zod y la función debe ser un componente de cliente, prisma client no puede ejecutarse en el navegador

    // Debe ser capaz de mostrar un mensaje en un toast

    // Imprime el mensaje en la consola del servidor
    // console.log("desde handleSumbit");

    // Obtiene los valores introducidos en los campos del formulario en objeto cuyas propiedades tienes pares de campo y valor
    const data = {
      name: formData.get("name"),
      price: formData.get("price"),
      categoryId: formData.get("categoryId"),
    };

    // console.log(data);

    // Aplica las validaciones definidas en el schema
    const result = ProductSchema.safeParse(data);
    // console.log(result);

    // Muestra los mensajes de errores en un toast
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });

      // No es necesario agregar lógica extra aquí.
      // En Next.js, cuando usas un formulario con action={handleSubmit} y la función handleSubmit no recarga la página ni retorna un redirect, los campos del formulario NO se limpian automáticamente si hay un return temprano (como en una validación fallida).
      // Por lo tanto, el formulario conservará los valores ingresados si la validación falla y simplemente retornas.
      return;
    }

    // Si paasa la validación
    console.log(result.data);
    return;
  };

  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
      {/* PRINCIPIO SOLID - OCP (Open Closed Principle), utilizar el mismo formulario para hacer diferentes acciones sin modificar el codigo de este formulario */}
      <form className="space-y-5" action={handleSubmit}>
        {/* <ProductForm /> */}

        {/* children (reserva un espacio), el codigo se ejecuta de forma unidireccional, el codigo que se recibe en children se ejecuta en el servidor, a esto se le conoce como un "composition pattern" en NextJs */}
        {children}

        <input
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          value="Registrar producto"
        />
      </form>
    </div>
  );
}
