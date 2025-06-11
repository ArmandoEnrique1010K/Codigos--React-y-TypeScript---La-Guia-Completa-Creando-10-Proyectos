import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { Project, TeamMember, TeamMemberForm, teamMembersSchema } from "../types";

// Llamada hacia la API para buscar usuario por email (requiere el id del proyecto y los datos del formulario)
export async function findUserByEmail({ projectId, formData }: { projectId: Project['_id'], formData: TeamMemberForm }) {
  try {
    // Realiza la solicitud al endpoint de la API y devuelve los datos obtenidos de la respuesta
    const url = `/projects/${projectId}/team/find`
    const response = await api.post(url, formData)

    // Imprime el objeto que se trae de la API, los datos del usuario en la propiedad data del objeto (email, name e _id)
    // console.log(data)

    // Corrección, debe retornar los datos de la API
    return response.data
  } catch (error) {
    // Si hay algun mensaje de error
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

// Agrega un usuario al proyecto
export async function addUserToProject({ projectId, id }: { projectId: Project['_id'], id: TeamMember['_id'] }) {
  try {
    const url = `/projects/${projectId}/team`
    // El id se tiene que enviar dentro de un objeto
    const { data } = await api.post<string>(url, { id })
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

// Obtener los miembros del equipo del proyecto, requiere el id del proyecto
export async function getProjectTeam(projectId: Project['_id']) {
  try {
    const url = `/projects/${projectId}/team`
    // Peticion de tipo get (corrección, debe ser de tipo get)
    const { data } = await api.get(url)

    // Infiere que la respuesta obtenida sea del mismo schema que teamMembersSchema
    const response = teamMembersSchema.safeParse(data)
    if (response.success) {
      return response.data // Devolvera los datos si es correcto la inferencia
    }

    // return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

// No puedes enviar un body si es una solicitud de tipo delete, realiza una correcion en el backend
// Eliminar un miembro del proyecto 
export async function removeUserFromProject({ projectId, userId }: { projectId: Project['_id'], userId: TeamMember['_id'] }) {
  try {
    const url = `/projects/${projectId}/team/${userId}`
    // Si es una solicitud de tipo delete, el segundo parametro es de configuración, no es el body
    const { data } = await api.delete<string>(url)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
