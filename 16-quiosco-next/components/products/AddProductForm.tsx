// No olvidar colocar use client para que se convierta en un componente de cliente de nextjs
"use client";

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
    console.log("desde handleSumbit");
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
