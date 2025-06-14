import { Task } from "@/types/index";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "@/api/TaskAPI";
import { toast } from "react-toastify";
import { useDraggable } from "@dnd-kit/core";

type TaskCardProps = {
  task: Task;
  canEdit: boolean;
};
export default function TaskCard({ task, canEdit }: TaskCardProps) {
  // Llama al hook useDraggable desde dnd-kid/core, requiere 1 argumento
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    // Pasa un id unico para que identifique el elemento que se va a arrastrar
    id: task._id,
  });

  // useDraggable contiene varias propiedades y funciones, segun la documentación https://docs.dndkit.com/api-documentation/draggable/usedraggable
  // isDragging: un evento que se ejecuta cuando el usuario arrastra el elemento
  // listeners: serie de funciones para habilitar los eventos de arrastrar el elemento
  // setNodeRef: especifica el elemento en el que se aplicara el draggable
  // transform: aplica un codigo CSS a los elementos

  const navigate = useNavigate();

  const params = useParams();
  const projectId = params.projectId!;

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteTask,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["project", projectId],
      });
      toast.success(data);
    },
  });

  // Imprime las tareas del proyecto, tiene una propiedad llamada project que contiene el id del proyecto
  // console.log(task);

  /* */
  // Llama a transform y aplica los estilos
  const style = transform
    ? {
        // translateX permite mover el elemento en el eje X (izquierda a derecha), existe tambien un translateY para moverlas de arriba a abajo

        // translate3d permite mover un elemento en el eje x, y, y z (fondo, no se aplica en este caso)
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,

        // Como no se puede colocar las configuraciones de dnd-kit en el elemento padre li porque elimina las funcionalidades del menu de una tarea, se puede optar por añadir unos estilos

        // Añade estos estilos, recuerda que se aplica en el contenido arrastrable
        padding: "1.25rem",
        backgroundColor: "#FFF",
        width: "300px",
        display: "flex",
        borderWidth: "1px",
        borderColor: "rgb(203 213 225)",
        // borderColor: "rgb(203 213 225 / var(--tw-border-opacity))",
      }
    : undefined;

  return (
    // No coloques las configuraciones de dnd-kit en este elemento, porque deshabilita la funcionalidad de las opciones de la tarea: ver, editar y eliminar
    <li className="p-5 bg-white border border-slate-300 flex justify-between gap-3">
      {/* Toma este elemento padre div, pasale la funcionalidad de listeners tal y como se muestra para que aplique las configuraciones, tambien los atributtes y setNodeRef, tambien especifica los estilos que se aplicaran */}
      <div
        // Configuraciones de dnd-kit
        {...listeners}
        {...attributes}
        ref={setNodeRef}
        style={style}
        className="min-w-0 flex flex-col gap-y-4"
      >
        {/* Convierte el boton a un parrafo y elimina el evento onClick */}
        <p
          className="text-xl font-bold text-slate-600 text-left"
          // Correción, debe ser editTask y no viewTask
          // Ahora al hacer clic en el titulo de una tarea, abre la ventana de ver tarea
          // onClick={() => navigate(location.pathname + `?viewTask=${task._id}`)}
        >
          {task.name}
        </p>
        <p className="text-slate-500">{task.description}</p>
      </div>
      <div>
        <div className="flex shrink-0  gap-x-6">
          <Menu as="div" className="relative flex-none">
            <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
              <span className="sr-only">opciones</span>
              <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
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
                    className="block px-3 py-1 text-sm leading-6 text-gray-900"
                    onClick={() =>
                      navigate(location.pathname + `?viewTask=${task._id}`)
                    }
                  >
                    Ver Tarea
                  </button>
                </MenuItem>

                {/* Si canEdit es true, muestra las opciones para editar y eliminar tarea */}
                {canEdit && (
                  <>
                    <MenuItem>
                      <button
                        type="button"
                        className="block px-3 py-1 text-sm leading-6 text-gray-900"
                        onClick={() =>
                          navigate(location.pathname + `?editTask=${task._id}`)
                        }
                      >
                        Editar Tarea
                      </button>
                    </MenuItem>

                    <MenuItem>
                      <button
                        type="button"
                        className="block px-3 py-1 text-sm leading-6 text-red-500"
                        onClick={() => mutate({ projectId, taskId: task._id })}
                      >
                        Eliminar Tarea
                      </button>
                    </MenuItem>
                  </>
                )}
              </MenuItems>
            </Transition>
          </Menu>
        </div>
      </div>
    </li>
  );
}
