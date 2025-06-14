import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Task, TaskStatus } from "@/types/index";
import TaskCard from "./TaskCard";
import { statusTranslations } from "@/locales/es";
import DropTask from "./DropTask";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatus } from "@/api/TaskAPI";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

type TaskListProps = {
  tasks: Task[];
  canEdit: boolean;
};

type GroupedTask = {
  [key: string]: Task[];
};

const initialStatusGroups: GroupedTask = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: [],
};

const statusStyles: { [key: string]: string } = {
  pending: "border-t-slate-500",
  onHold: "border-t-red-500",
  inProgress: "border-t-blue-500",
  underReview: "border-t-amber-500",
  completed: "border-t-emerald-500",
};

export default function TaskList({ tasks, canEdit }: TaskListProps) {
  // Obten el projectId de la URL
  const params = useParams();
  const projectId = params.projectId!;

  const queryClient = useQueryClient();

  // Llama al hook useMutation para actualizar el estado desde el backend
  const { mutate } = useMutation({
    mutationFn: updateStatus,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });

      // No es necesario invalidar el queryKey de taskId, porque al arrastrar una tarea, luego pulsas ver tarea, ahi se hace la nueva consulta...

      // queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    },
  });

  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroups);

  // Pasa un evento, el tipo de dato es DragEndEvent
  const handleDragEnd = (e: DragEndEvent) => {
    // Arrastra la tarea hacia un dropabble para imprimir el mensaje
    // console.log("Soltates...");

    // Al imprimir el evento e, muestra un objeto que contiene la prop active, dnetro contiene un id que es el id de la tarea definido en useDraggable, la propiedad over contiene otro id que es el id de donde se esta dejando el elemento, si se arrastra el elemento hacia cualquier otra parte (que no sea el elemento draggable), simplemente la propiedad over tiene el valor null
    // console.log(e);

    // Obten las propiedades necesarias
    const { over, active } = e;

    // Arrastra la tarea hacia un droppable para imprimir el valor valido
    if (over && over.id) {
      // console.log("Valido...");

      // Imprime el id de la tarea que fue arrastrada
      // console.log(active.id);

      const taskId = active.id.toString();

      // Imprime el estado de la terea
      // console.log(over.id)

      const status = over.id as TaskStatus;

      // taskId es de tipo string y status debe ser uno de los valores especificados en TaskStatus
      mutate({ projectId, taskId, status });
    } else {
      console.log("No Valido...");
    }
  };

  return (
    <>
      <h2 className="text-5xl font-black my-10">Tareas</h2>

      <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32">
        {/* Debes llamar al componente DndContext y rodear todo el contenido que se podra arrastrar, se trata del contexto de Drag and drop, puedes definir varios contextos en una aplicacion web */}

        {/* Soporta varias prop: onDragEnd, cuando sueltas el elemento en un droppable */}
        <DndContext onDragEnd={handleDragEnd}>
          {Object.entries(groupedTasks).map(([status, tasks]) => (
            <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
              <h3
                className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 ${statusStyles[status]}`}
              >
                {statusTranslations[status]}
              </h3>

              {/* Muestra el componente DropTask */}
              {/* Pasale el estatus de la tarea como prop */}
              <DropTask status={status} />
              <ul className="mt-5 space-y-5">
                {tasks.length === 0 ? (
                  <li className="text-gray-500 text-center pt-3">
                    No Hay tareas
                  </li>
                ) : (
                  tasks.map((task) => (
                    // Pasa la prop canEdit
                    <TaskCard key={task._id} task={task} canEdit={canEdit} />
                  ))
                )}
              </ul>
            </div>
          ))}
        </DndContext>
      </div>
    </>
  );
}
