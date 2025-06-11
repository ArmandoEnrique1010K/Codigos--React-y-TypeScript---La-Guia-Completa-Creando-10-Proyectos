import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TeamMember } from "@/types/index";
import { addUserToProject } from "@/api/TeamAPI";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

type SearchResultProps = {
  user: TeamMember;
  reset: () => void; // No olvidar esta prop
};

export default function SearchResult({ user, reset }: SearchResultProps) {
  // Antes de asignar el type, imprime el usuario que ha sido encontrado
  // console.log(user);

  // Hook useNavigate para navegar entre paginas
  const navigate = useNavigate();

  // Extrae el id del proyecto de la URL como parametro
  const params = useParams();
  const projectId = params.projectId!; // Siempre habra un projectId

  // Instancia de useQueryClient
  const queryClient = useQueryClient();

  // Instancia de useMutation para el manejo de la función de agregar miembro al proyecto
  const { mutate } = useMutation({
    mutationFn: addUserToProject,
    onError: (error) => {
      // Utiliza las notificaciones Toast
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data); // Recuerda que la respuesta de la petición es un String con un mensaje
      reset(); // Reinicia el formulario y la mutación

      // Navega hacia la misma pagina sin recargar la misma pagina, como resultado, cierra la ventana modal
      navigate(location.pathname, { replace: true });

      // Debe invalidar el queryKey que se utiliza para listar los miembros del proyecto
      queryClient.invalidateQueries({ queryKey: ["projectTeam", projectId] });
    },
  });

  const handleAddUserToProject = () => {
    const data = {
      projectId,
      id: user._id, // Como el id esta dentro de un objeto, se llama a la propiedad _id de user
    };

    // Muta los datos
    mutate(data);
  };

  // Cuando agregues el usuario desde el frontend (luego de pulsar el boton de agregar usuario cuando ha sido encontrado, revisa la base de datos con MongoDB Compass)
  // Luego pulsa el mismo boton otra vez, y podras ver el mensaje de error de que el usuario ya existe en el proyecto

  return (
    <>
      <p className="mt-10 text-center font-bold">Resultado:</p>
      <div className="flex justify-between items-center">
        <p>{user.name}</p>
        <button
          className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer"
          onClick={handleAddUserToProject}
        >
          Agregar al Proyecto
        </button>

        {/* Luego de pulsar el botón, el formulario se reiniciara y el resultado del usuario encontrado debe limpiarse (la mutación) */}
      </div>
    </>
  );
}
