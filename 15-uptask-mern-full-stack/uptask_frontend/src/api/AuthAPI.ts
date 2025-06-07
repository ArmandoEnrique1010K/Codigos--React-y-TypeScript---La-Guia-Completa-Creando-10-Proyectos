import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { ConfirmToken, ForgotPasswordForm, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm } from "../types";

export async function createAccount(formData: UserRegistrationForm) {
  try {
    const url = `/auth/create-account`
    const { data } = await api.post<string>(url, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function confirmAccount(formData: ConfirmToken) {
  try {
    const url = `/auth/confirm-account`
    const { data } = await api.post<string>(url, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}


export async function requestConfirmationCode(formData: RequestConfirmationCodeForm) {
  try {
    const url = `/auth/request-code`
    const { data } = await api.post<string>(url, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}


export async function authenticateUser(formData: UserLoginForm) {
  try {
    const url = `/auth/login`
    const { data } = await api.post<string>(url, formData)

    // Imprime el JWT (viene del backend)
    // console.log(data)

    /* */

    // ¿Donde colocar el JWT?

    // LocalStorage (más comun)
    // SessionStorage (hasta que se cierre el navegador)
    // Cookies

    /* */

    // Ventajas de LocalStorage
    // Facilidad de uso: localStorage es fácil de utilizar y no requiere configuración adicional para almacenar y recuperar datos.

    // Persistencia: Los datos almacenados en localStorage permanecen en el navegador, incluso después de cerrarlo y reiniciar la computadora

    // Rendimiento: Puede ser más rapido acceder a los datos en localStorage que en las cookies debido a que no se envían con cada solicitud HTTP

    // Desventajas de LocalStorage

    // Vulnerabilidad a ataques XSS: Los datos en localStorage son vulnerables a ataques de script entre sitios (XSS) si no se implementan adecuadas medidas de seguridad --> No se debe preocupar si utilizas un ORM

    // Capacidad limitada: El almacenamiento en localStorage está limitado a un tamaño máximo de 5 - 10 MB por dominio

    // No es compatible con solicitudes cruzadas (CORS): Los datos almacenados en localStorage no se envían automáticamente con las solicitudes CORS a otros dominios.

    /* */

    // Ventajas de los Cookies

    // Seguridad: Las cookies pueden configurarse con las banderas HttpOnly y Secure para aumentar la seguridad y proteger contra ataques XSS y CSRF

    // Soporte para CORS: Las cookies se envian automaticamente con las solicitudes CORS, lo que facilita el manejo de autenticacion en aplicaciones distribuidas

    // Control de expiracion: Puedes configurar una fecha de expiracion para las cookies y estas se eliminan automaticamente.

    // Desventajas de las Cookies

    // Sobrecarga de red: Las cookies se envian con cada solicitud HTTP, lo que puede aumentar el trafico de red si los tokens son grandes

    // Capacidad limitada: Al igual que localStorage, las cookies tambien tienen un tamaño maximo de almacenamiento por dominio (generalmente 4Kb por cookie)

    // Menos persistencia: Las cookies pueden ser eliminadas por el usuario o expirar automaticamente despues de un periodo de tiempo, lo que puede requerir una renovacion periodica de los tokens

    /* */

    // Guarda el JWT en localStorage (el nombre del key debe ser unico)
    localStorage.setItem('AUTH_TOKEN', data)

    // Abre la consola de chrome pulsando F12 y ve a la pestaña Aplicacion
    // En el panel Almacenamiento, selecciona "Almacenamiento local", selecciona el dominio web (http://localhost:5173)
    // Podras ver la clave AUTH_TOKEN y el JWT como valor

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function forgotPassword(formData: ForgotPasswordForm) {
  try {
    const url = `/auth/forgot-password`
    const { data } = await api.post<string>(url, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

// TODO: CONTINUA EN 574

