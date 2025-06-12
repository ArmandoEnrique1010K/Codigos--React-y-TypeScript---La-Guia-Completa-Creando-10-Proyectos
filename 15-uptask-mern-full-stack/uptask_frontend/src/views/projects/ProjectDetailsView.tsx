import { getProjectById } from "@/api/ProjectAPI";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskList from "@/components/tasks/TaskList";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/policies";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

export default function ProjectDetailsView() {
  // Renombra las variables traidas de useAuth
  const { data: user, isLoading: authLoading } = useAuth();

  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectById(projectId),
    retry: false,
  });

  // Para evitar que una función se ejecute varias veces se utiliza useMemo, memoriza el resultado de una función hasta que una de sus depedencias cambie su valor

  // Función para verificar que el usuario pueda editar
  const canEdit = useMemo(() => data?.manager === user?._id, [data, user]);
  // console.log(canEdit);

  // Verifica si authLoading tambien es true (esta cargando), además tambien se verifica que haya un user autenticado
  if (isLoading && authLoading) return "Cargando...";
  if (isError) return <Navigate to="/404" />;
  if (data && user)
    return (
      <>
        <h1 className="text-5xl font-black">{data.projectName}</h1>
        <p className="text-2xl font-light text-gray-900 mt-5">
          {data.description}
        </p>

        {/* Llama a isManager pasando los parametros requeridos y si es manager del proyecto muestra los botones para agregar tarea y los colaboradores */}
        {isManager(data.manager, user._id) && (
          <nav className="my-5 flex gap-3">
            <button
              type="button"
              className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
              onClick={() => navigate(location.pathname + "?newTask=true")}
            >
              Agregar Tarea
            </button>

            {/* Boton para ver los colaboradores */}
            <Link
              to={"team"}
              className="bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            >
              Colaboradores
            </Link>
          </nav>
        )}

        {/* Pasa la prop canEdit */}
        <TaskList tasks={data.tasks} canEdit={canEdit} />
        <AddTaskModal />
        <EditTaskData />
        <TaskModalDetails />
      </>
    );
}
