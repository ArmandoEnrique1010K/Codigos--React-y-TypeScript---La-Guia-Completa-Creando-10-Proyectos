import ProductForm from "./ProductForm";

// Este formulario contiene la logica de agregar un producto
export default function AddProductForm() {
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
        <ProductForm />
        <input
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          value="Registrar producto"
        />
      </form>
    </div>
  );
}
