"use client";
import { SearchSchema } from "@/src/schema";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
// Utiliza el hook de useRouter de next/navigation para redireccionar en el cliente en el app router

// Componente de formulario para buscar productos
export default function ProductSearchForm() {
  const router = useRouter();

  // Este componente no interactua con prisma, es un componente de servidor que tiene que ser convertido a un componente de cliente para mostrar los mensajes de toast

  // Función auxiliar
  const handleSearchForm = (formData: FormData) => {
    const data = {
      // Obtiene el valor introducido en el campo search
      search: formData.get("search"),
    };

    const result = SearchSchema.safeParse(data);
    // console.log(result);

    // Muestra el mensaje de error en un toast
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });

      // Termina la ejecución de la función
      return;
    }

    // Si pasa la validación
    // La función redirect sirve para redireccionar hacia otra pagina
    // redirect(`/admin/products/search?search=${result.data.search}`);

    // Tambien puedes usar el hook useRouter, el metodo push para redireccionar
    router.push(`/admin/products/search?search=${result.data.search}`);
  };

  return (
    <form className="flex items-center" action={handleSearchForm}>
      <input
        type="text"
        placeholder="Buscar Producto"
        className="p-2 placeholder-gray-400 w-full bg-white"
        name="search"
      />

      <input
        type="submit"
        className="bg-indigo-600 p-2 uppercase text-white cursor-pointer"
        value={"Buscar"}
      />
    </form>
  );
}
