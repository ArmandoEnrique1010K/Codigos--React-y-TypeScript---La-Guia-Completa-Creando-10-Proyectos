import { Fragment } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject, getProjects } from "@/api/ProjectAPI";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";

export default function DashBoardView() {
  // Renombra las variables traidas de useAuth
  const { data: user, isLoading: authLoading } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  // Al imprimir data, si no viene la propiedad manager, se debe hacer una modificacion en types/index.ts
  console.log(data);

  // Imprime el id del usuario que ha iniciado sesión
  console.log(user?._id);

  // En cada uno de los objetos impresos desde data, la propiedad manager debe coincidir con el valor del usuario en user?._id, para que esa persona tenga la autorización de acceder al panel de gestionar el proyecto

  // Comprueba ambos estados de carga
  if (isLoading && authLoading) return "Cargando...";

  if (data)
    return (
      <>
        <h1 className="text-5xl font-black">Mis proyectos</h1>
        <p className="txt-2xl font-light text-gray-500 mt-5">
          Maneja y administra tus proyectos
        </p>
        <nav className="my-5">
          <Link
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to="/projects/create"
          >
            Nuevo Proyecto
          </Link>
        </nav>

        {data.length ? (
          <ul
            role="list"
            className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg"
          >
            {data.map((project) => (
              <li
                key={project._id}
                className="flex justify-between gap-x-6 px-5 py-10"
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <div className="mb-2">
                      {
                        // Comprueba de que si el manager del proyecto es el usuario autenticado para mostrar el rol de manager o miembro del equipo
                        project.manager === user?._id ? (
                          <p className="font-bold text-xs uppercase bg-indigo-50 text-indigo-500 border-2 border-indigo-500 rounded-lg inline-block py-1 px-5">
                            Manager
                          </p>
                        ) : (
                          <p className="font-bold text-xs uppercase bg-indigo-50 text-green-500 border-2 border-green-500 rounded-lg inline-block py-1 px-5">
                            Miembro del equipo
                          </p>
                        )

                        // El manejo de roles es muy frecuente en la programación fullstack
                      }
                    </div>
                    <Link
                      to={`/projects/${project._id}`}
                      className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
                    >
                      {project.projectName}
                    </Link>
                    <p className="text-sm text-gray-400">
                      Cliente: {project.clientName}
                    </p>
                    <p className="text-sm text-gray-400">
                      {project.description}
                    </p>
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
                          <Link
                            to={`/projects/${project._id}`}
                            className="block px-3 py-1 text-sm leading-6 text-gray-900"
                          >
                            Ver Proyecto
                          </Link>
                        </MenuItem>

                        {/* Si el manager del proyecto sea igual que el id del usuario autenticado (el que ha iniciado sesión), debe mostrar ese contenido */}
                        {project.manager === user?._id && (
                          <>
                            <MenuItem>
                              <Link
                                to={`/projects/${project._id}/edit`}
                                className="block px-3 py-1 text-sm leading-6 text-gray-900"
                              >
                                Editar Proyecto
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <button
                                type="button"
                                className="block px-3 py-1 text-sm leading-6 text-red-500"
                                onClick={() => mutate(project._id)}
                              >
                                Eliminar Proyecto
                              </button>
                            </MenuItem>
                          </>
                        )}

                        {/* Puedes iniciar sesion en la aplicacion en 2 ventanas (una de ellas en modo incognito del navegador), cada ventana con un usuario diferente y compara que si aparece las opciones en el panel de inicio (editar y eliminar proyecto) */}

                        {/* El usuario que ha iniciado sesion puede crear sus proyectos y se considera manager del proyecto, luego el podra agregar miembros a su equipo */}
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center py-29">
            No hay proyectos aún {""}
            <Link className="text-fuchsia-500 font-bold" to="/projects/create">
              Crear Proyecto
            </Link>
          </p>
        )}
      </>
    );
}
