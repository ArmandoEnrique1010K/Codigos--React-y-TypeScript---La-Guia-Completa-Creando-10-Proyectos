import AddMemberModal from "@/components/team/AddMemberModal";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProjectTeam, removeUserFromProject } from "@/api/TeamAPI";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react/jsx-runtime";
import { toast } from "react-toastify";

// Vista que representa los miembros del proyecto
export default function ProjectTeamView() {
  const navigate = useNavigate();

  // Obtiene los parametros de la URL
  const params = useParams();

  // El id del proyecto
  // console.log(params.projectId);

  const projectId = params.projectId!;

  // Hook useQuery, para obtener los datos de la respuesta de la petición
  const { data, isLoading, isError } = useQuery({
    queryKey: ["projectTeam", projectId], // Asigna un queryKey unico basado en el id del proyecto
    queryFn: () => getProjectTeam(projectId),
    retry: false, // Evita segundo intento
  });

  const queryClient = useQueryClient();

  // Hook useMutate, maneja la función para eliminar al usuario del proyecto
  const { mutate } = useMutation({
    mutationFn: removeUserFromProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["projectTeam", projectId] });
    },
  });

  // Se necesita invalidar el queryKey, porque sucede que si pulsa el boton de eliminar miembro del proyecto (eliminar usuario), en la vista del usuario, todavia se puede ver el usuario, pero desaparece si vuelve a cargar la pagina. Se realiza en el componente SearchResult.tsx y en este componente cuando se agrega un miembro y cuando se elimina uno-

  // Casos si esta cargando o hay un error en el resultado de useQuery
  if (isLoading) return "Cargando...";
  if (isError) return <Navigate to={"/404"} />;

  // Si hay datos (se considera tambien como dato un arreglo vacio [], cuando no hay usuarios), retorna el componente
  if (data)
    return (
      <>
        <h1 className="text-5xl font-black">Administra Equipo</h1>
        <p className="text-2xl font-light text-gray-900 mt-5">
          Administra el equipo de trabajo para este proyecto
        </p>
        <nav className="my-5 flex gap-3">
          {/* Al hacer clic en el botón se agrega en la URL el query string addMember=true */}
          <button
            type="button"
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            onClick={() => navigate(location.pathname + "?addMember=true")}
          >
            Agregar Colaborador
          </button>

          {/* Boton para ir hacia el proyecto */}
          <Link
            to={`/projects/${projectId}`}
            className="bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
          >
            Volver a proyecto
          </Link>
        </nav>

        {/* Codigo para mostrar los miembros actuales (traido desde github), realiza las importaciones necesarias */}
        <h2 className="text-5xl font-black my-10">Miembros actuales</h2>
        {data.length ? (
          <ul
            role="list"
            className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg"
          >
            {/* No olvidar el key y los datos que se van a mostrar en la vista */}
            {data?.map((member) => (
              <li
                key={member._id}
                className="flex justify-between gap-x-6 px-5 py-10"
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <p className="text-2xl font-black text-gray-600">
                      {member.name}
                    </p>
                    <p className="text-sm text-gray-400">{member.email}</p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-x-6">
                  <Menu as="div" className="relative flex-none">
                    <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                      <span className="sr-only">opciones</span>
                      <EllipsisVerticalIcon
                        className="h-9 w-9"
                        aria-hidden="true"
                      />
                    </MenuButton>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                        <MenuItem>
                          <button
                            type="button"
                            className="block px-3 py-1 text-sm leading-6 text-red-500"
                            // Llama a la función mutate, pasa los parametros necesarios, projectId y userId
                            onClick={() =>
                              mutate({ projectId, userId: member._id })
                            }
                          >
                            Eliminar del Proyecto
                          </button>
                        </MenuItem>
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center py-20">No hay miembros en este equipo</p>
        )}

        {/* Llama al componente para mostrar la ventana modal */}
        <AddMemberModal />
      </>
    );
}
