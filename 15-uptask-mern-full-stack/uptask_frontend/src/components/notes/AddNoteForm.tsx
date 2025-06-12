import { NoteFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { createNote } from "@/api/NoteAPI";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

// Formulario para agregar una nota
export default function AddNoteForm() {
  // Extrae projectId de los parametros de la URL (con el operador ! se asegura que no sea null o undefined)
  const params = useParams();
  const projectId = params.projectId!;

  // Extrae los query strings de la URL (parametros que van luego del signo de & en la URL) para obtener el id de la tarea
  const queryParams = new URLSearchParams(location.search);

  // El query String viewTask contiene el id de la tarea, no olvidar el signo al final
  const taskId = queryParams.get("viewTask")!;

  // Se añade el type NoteFormData
  const initialValues: NoteFormData = {
    content: "",
  };

  // Instancia del hook useForm
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  // Llama al hook useMutation para llamar a la función createNote
  const { mutate } = useMutation({
    mutationFn: createNote,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
    },
  });

  // Función auxiliar para añadir una nota
  const handleAddNote = (formData: NoteFormData) => {
    // Imprime el contenido que se ha introducido en los campos del formulario en un objeto de pares campo y valor
    // console.log(formData);

    // Verifica los valores de los IDs (añade una nota para ver los ids en la consola, pulsa el boton crear nota luego de abrir una tarea)
    // console.log(projectId);
    // console.log(taskId);

    // Llama a la función mutate para realizar la solicitud en la API
    mutate({ projectId, taskId, formData });

    // Reinicia el formulario
    reset();
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
