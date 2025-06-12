import { isAxiosError } from "axios";
import { NoteFormData, Project, Task } from "../types";
import api from "@/lib/axios";

// Crea un type para 
type NoteAPIType = {
  formData: NoteFormData,
  projectId: Project['_id'],
  taskId: Task['_id'],
}

// Función para crear una nota
export async function createNote({ projectId, taskId, formData }: Pick<NoteAPIType, 'projectId' | 'taskId' | 'formData'>) {
  try {
    // Realiza un llamado a la API y pasa el contenido de formData en el body
    const url = `/projects/${projectId}/tasks/${taskId}/notes`;
    const { data } = await api.post<string>(url, formData)
    return data

  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
