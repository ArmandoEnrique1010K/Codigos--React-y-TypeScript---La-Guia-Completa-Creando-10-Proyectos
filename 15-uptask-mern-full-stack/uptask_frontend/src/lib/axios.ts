import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

// Un interceptor en Axios es básicamente una función que se ejecuta antes o después de una petición HTTP, existen 2 tipos:
// Interceptor de solicitud (Request Interceptor): Se ejecuta antes de que se envie una peticion HTTP, se puede utilizarse para agregar headers personalizados
// Interceptor de respuesta (Response Interceptor): Se ejecuta despues de una peticion HTTP, se utiliza para procesar un respuesta, acciones en funcion de la respuesta, manejar algun error, etc.

// Para no pasar el mismo codigo en todos los endpoints se utiliza un Request Interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('AUTH_TOKEN')

  // Si existe el token, debe inyectar el token en los headers de autorización
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// Como el request interceptor se aplica en todos los endpoints, el usuario que ha iniciado sesion en la aplicacion podra realizar todas las tareas relacionadas al proyecto

// Si tratas de acceder a un proyecto del otro usuario con un usuario que no es el mismo, va a mostrar una pagina en blanco, endpoint /404

export default api