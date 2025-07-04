import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { Project, Task, TaskFormData, taskSchema } from "../types";

type TaskAPI = {
  formData: TaskFormData,
  projectId: Project['_id'],
  taskId: Task['_id'],
  status: Task['status']
}

export async function createTask({ formData, projectId }: Pick<TaskAPI, 'formData' | 'projectId'>) {
  try {
    const url = `/projects/${projectId}/tasks`
    const { data } = await api.post<string>(url, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function getTaskById({ projectId, taskId }: Pick<TaskAPI, 'projectId' | 'taskId'>) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}`
    const { data } = await api(url)

    // Observa que se tiene que mostrar la información del usuario que ha realizado el cambio del estado (solo muestra el id del usuario)
    // console.log(data)

    // Devuelve data para no mostrar un error cuando el usuario hace clic sobre una de sus tareas
    // return data;

    // Elimina el return data, ya puede ejecutar el safeParse segun el type definido en taskSchema

    /* */

    // En el frontend puedes cambiar el estado de la tarea y se vera almacenado los cambios en la base de datos

    // Imprime la respuesta de la petición (información de la tarea, tiene la propiedad completedBy con el id del usuario que ha completado la tarea)
    // console.log(data)

    // Hay un problema si una tarea tiene el campo completedBy el valor null, mostrara un error en la consola, si se imprime data

    /* */

    // Recordar que al imprimir data, tambien incluye la propiedad notes con los datos de cada nota

    const response = taskSchema.safeParse(data)

    if (response.success) {
      // Al imprimir response.data, si no trae los datos de las notas, se tiene que modifcar taskSchema
      // console.log(response.data)
      return response.data
    }

    // Si no ves la propiedad completedBy, debes realizar una modificacion en los types
    // console.log(response.data)

  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function updateTask({ projectId, taskId, formData }: Pick<TaskAPI, 'projectId' | 'taskId' | 'formData'>) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}`
    const { data } = await api.put<string>(url, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function deleteTask({ projectId, taskId }: Pick<TaskAPI, 'projectId' | 'taskId'>) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}`
    const { data } = await api.delete<string>(url)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function updateStatus({ projectId, taskId, status }: Pick<TaskAPI, 'projectId' | 'taskId' | 'status'>) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}/status`
    const { data } = await api.post<string>(url, { status })
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}


