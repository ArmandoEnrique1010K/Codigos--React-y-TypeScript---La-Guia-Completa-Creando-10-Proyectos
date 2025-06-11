import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "../ErrorMessage";
import { TeamMemberForm } from "@/types/index";
import { findUserByEmail } from "@/api/TeamAPI";

export default function AddMemberForm() {
  const initialValues: TeamMemberForm = {
    email: "",
  };
  const params = useParams();
  const projectId = params.projectId!;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  // Aqui no se utiliza el objeto mutate para llamar al hook useMutation, porque si se quiere el objeto de mutación completo, la variable mutation almacena el resultado de la mutación, se requiere obtener la información y mostrarla en pantalla
  const mutation = useMutation({
    mutationFn: findUserByEmail,
  });

  // Función auxiliar para buscar el usuario
  const handleSearchUser = async (formData: TeamMemberForm) => {
    // Requiere el id del proyecto y los datos del formulario (el email del usuario)
    const data = { projectId, formData };

    // Muta los datos
    mutation.mutate(data);

    // Imprime un objeto con las propiedades con valores y funciones (metodos) que se pueden llamar
    // console.log(mutation);
  };

  // Llamas a la función handleSearchUser cuando haces clic en el boton del formulario para agregar un usuario al equipo del proyecto

  return (
    <>
      <form
        className="mt-10 space-y-5"
        onSubmit={handleSubmit(handleSearchUser)}
        noValidate
      >
        <div className="flex flex-col gap-3">
          <label className="font-normal text-2xl" htmlFor="name">
            E-mail de Usuario
          </label>
          <input
            id="name"
            type="text"
            placeholder="E-mail del usuario a Agregar"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <input
          type="submit"
          className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
          value="Buscar Usuario"
        />
      </form>

      <div className="mt-10">
        {/* Mientras esta cargando el resultado de useMutation, muestra lo siguiente */}
        {mutation.isPending && <p className="text-center">Cargando</p>}

        {/* Como no se va a utilizar un Toast de Toastify, se debe mostrar el mensaje de error en la vista del usuario */}
        {/* Muestra el mensaje de error, por ejemplo, si no existiera el usuario */}
        {mutation.isError && (
          <p className="text-center">{mutation.error.message}</p>
        )}
      </div>
    </>
  );
}
