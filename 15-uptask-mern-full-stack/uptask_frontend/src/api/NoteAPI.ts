import { isAxiosError } from "axios";
import { Note, NoteFormData, Project, Task } from "../types";
import api from "@/lib/axios";

// Crea un type para 
type NoteAPIType = {
  formData: NoteFormData,
  projectId: Project['_id'],
  taskId: Task['_id'],
  // Añade el type para la propiedad noteId
  noteId: Note['_id']
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

// Función para eliminar una nota, se asigna un type a los parametros
export async function deleteNote({ projectId, taskId, noteId }: Pick<NoteAPIType, 'projectId' | 'taskId' | 'noteId'>) {
  try {
    // La URL para eliminar es muy larga
    const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`;
    const { data } = await api.delete<string>(url)
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}