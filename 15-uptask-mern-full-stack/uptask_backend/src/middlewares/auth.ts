import { Request, Response, NextFunction } from 'express';

// Se puede crear un middleware que verifique el usuario este autenticado
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  // Cada vez que se crea un nuevo proyecto, se tiene que enviar el JWT en un header (se envia antes que el body en una petición HTTP)

  // URL - Headers - Body

  // Imprime los headers de autorización
  // console.log(req.headers.authorization)

  // En Postman puedes enviar los headers adicionales
  // Antes de realizar una petición a la URL: localhost:4000/api/projects, además de los datos que van en el body:

  /*
  {
    "projectName": "Ecommerce",
    "clientName": "ADIDAS",
    "description": "Proyecto Ecommerce con Next y Shopify"
  }
  */

  // Ve a la pestaña Auth, selecciona en Auth Type "Bearer Token" y luego escribe "un token" o cualquier otro valor, realiza la petición.

  // En la consola, al imprimir req.headers.authorization, imprime: "Bearer un token"

  // Comprobación si el token no existe
  const bearer = req.headers.authorization

  if (!bearer) {
    const error = new Error('No Autorizado')
    res.status(401).json({ error: error.message })
    return
  }

  // Para no enviar ningun token de autorización en Postman, selecciona en Auth Type, la opción "No Auth", imprime el mensaje de error

  // Normalmente al imprimir los headeres de autorización, siempre empieza con la palabra y un espacio en blanco "Bearer ", (convención estandar para enviar los headers)

  // Puedes eliminar la palabra (además de su espacio en blanco) "Bearer " con el siguiente codigo
  // const token = bearer.split(' ')[1]

  // Y envia un JWT en Postman, selecciona la opción "Bearer Token", ahora solamente imprimira el token
  // Ejemplo: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjBkODRhYmFjNThjZGY0MWExMWMxYyIsImlhdCI6MTc0OTMxMzIyNywiZXhwIjoxNzQ5MzEzNTg3fQ.8azekhjVtoK22q_9CexE0SPErJuFc4v9vqG-SAlvvD4
  // console.log(token)

  // Otra forma es utilizar un array destructuring
  const [, token] = bearer.split(' ')
  console.log(token)

  next()
}