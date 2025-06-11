import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { Project, TeamMemberForm } from "../types";

// Llamada hacia la API para buscar usuario por email (requiere el id del proyecto y los datos del formulario)
export async function findUserByEmail({ projectId, formData }: { projectId: Project['_id'], formData: TeamMemberForm }) {
  try {
    // Realiza la solicitud al endpoint de la API y devuelve los datos obtenidos de la respuesta
    const url = `/projects/${projectId}/team/find`
    const data = await api.post(url, formData)

    // Imprime el objeto que se trae de la API, los datos del usuario en la propiedad data del objeto (email, name e _id)
    // console.log(data)
    return data
  } catch (error) {
    // Si hay algun mensaje de error
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}