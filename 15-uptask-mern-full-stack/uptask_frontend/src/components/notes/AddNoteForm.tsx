import { NoteFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";

// Formulario para agregar una nota
export default function AddNoteForm() {
  // Se añade el type NoteFormData
  const initialValues: NoteFormData = {
    content: "",
  };

  // Instancia del hook useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  // Función auxiliar para añadir una nota
  const handleAddNote = (formData: NoteFormData) => {
    // Imprime el contenido que se ha introducido en los campos del formulario en un objeto de pares campo y valor
    console.log(formData);
  };

  return (
    // Llama a la función handleSubmit de useForm
    <form
      onSubmit={handleSubmit(handleAddNote)}
      className="space-y-3"
      noValidate
    >
      <div className="flex flex-col gap-2">
        <label className="font-bold" htmlFor="content">
          Crear Nota
        </label>
        <input
          id="content"
          type="text"
          placeholder="Contenido de la nota"
          className="w-full p-3 border border-gray-300"
          // Valida el campo content
          {...register("content", {
            required: "El contenido de la nota es obligatorio",
          })}
        />
        {
          // Muestra el mensaje de error en la vista del usuario
          errors.content && (
            <ErrorMessage>{errors.content.message}</ErrorMessage>
          )
        }
      </div>

      <input
        type="submit"
        value="Crear Nota"
        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-black cursor-pointer"
      />
    </form>
  );
}
