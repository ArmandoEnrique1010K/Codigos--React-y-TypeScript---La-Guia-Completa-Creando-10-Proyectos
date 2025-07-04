import api from "@/lib/axios";
import { dashBoardSchema, editProjectSchema, Project, ProjectFormData, projectSchema } from "../types";
import { isAxiosError } from "axios";

export async function createProject(formData: ProjectFormData) {
  try {
    const { data } = await api.post('/projects', formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function getProjects() {

  // Obtiene el token desde localStorage
  // const token = localStorage.getItem('AUTH_TOKEN')
  // console.log(token)

  // Para generar el token ve a http://localhost:5173/auth/login, e inicia sesión con un usuario existente

  try {

    // Puedes inyectar el token en los headers
    // Necesariamente debe llevar el termino "Bearer " al inicio del token, porque el backend es el encargado 
    // de eliminar la palabra "Bearer " cuando recibe el token
    const { data } = await api('/projects',
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`
      //   }
      // }
    )

    // Primero inicia sesión desde http://localhost:5173/auth/login (escribe la URL en la barra de direcciones del navegador)
    // Luego accede manualmente a http://localhost:5173/, se observa los proyectos del usuario que ha iniciado sesión
    // Realiza el mismo procedimiento con otro usuario existente

    // Como se va a utilizar un request interceptor, ya no se tiene que colocar la configuración de axios en cada función
    // Recordar que el metodo api es el cliente de axios, el backend se encarga de validar el token y verificar que el usuario exista

    const response = dashBoardSchema.safeParse(data)

    if (response.success) {
      return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function getProjectById(id: Project['_id']) {
  try {
    const { data } = await api(`/projects/${id}`)
    // La respuesta debe tener el mismo schema
    const response = editProjectSchema.safeParse(data)
    if (response.success) {
      return response.data
    }
    // return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

// Obtener el proyecto por Id, pero con todos los datos completos
export async function getFullProjectById(id: Project['_id']) {
  try {
    const { data } = await api(`/projects/${id}`)
    const response = projectSchema.safeParse(data)
    if (response.success) {
      return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}



type ProjectAPIType = {
  formData: ProjectFormData,
  projectId: Project["_id"]
}

export async function updateProject({ formData, projectId }: ProjectAPIType) {
  try {
    const { data } = await api.put<string>(`/projects/${projectId}`, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function deleteProject(id: Project['_id']) {
  try {
    const url = `/projects/${id}`
    const { data } = await api.delete<string>(url)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
