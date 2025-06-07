import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import User, { IUser } from '../models/User';

// Reescribe el type de Request de manera global, 
declare global {
  namespace Express {
    interface Request {
      // La interface Request va heredar la interface de IUser, el user es una propiedad opcional
      user?: IUser
    }
  }
}


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
  // console.log(token)


  try {
    // Verifica que el token sea valido, el metodo verify requiere del token generado y la palabra clave secreta desde ".env"
    // Debe ser la misma clave con la que se firma el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Imprime el token decodificado
    // console.log(decoded)

    // Para tener un nuevo token (en el caso de que muestre un error porque el token ya ha caducado), puedes
    // volver a iniciar sesión desde el frontend en "http://localhost:5173/auth/login" o desde Postman, endpoint
    // "localhost:4000/api/auth/login"

    // Ve a localhost:4000/api/projects en Postman, coloca el token (opción "Bearer Token")
    // Posible valor que imprimira "decoded": { id: '6820d84abac58cdf41a11c1c', iat: 1749313803, exp: 1749314163 }

    // id: el id del usuario
    // iat: Indica cuándo se emitió el token.*
    // exp: Indica cuándo expira el token.*

    // *El tiempo se mide en segundos desde la época Unix (Unix epoch), es decir, desde el 1 de enero de 1970 a las 00:00:00 UTC

    // Tambien se debe garantizar que el usuario exista (realizando una consulta a la base de datos)
    // decoded es un objeto y se debe validar con typescript
    // decoded.id es el id del usuario que se encuentra en el token
    if (typeof decoded === 'object' && decoded.id) {
      // Luego de reescribir el type de User, utiliza el metodo select para seleccionar las propiedades necesarias
      const user = await User.findById(decoded.id).select('_id name email')
      // Imprime los datos del usuario
      // console.log(user)

      // Si el usuario existe
      if (user) {
        // Puedes pasar datos de un middleware hacia otro, se escribe en el objeto de req, pero antes debes modificar la interface de Request
        req.user = user

        // De esa forma se evita que el password se guarde en algun lugar de la aplicación
      } else {
        res.status(500).json({ error: "Token No Válido" })
      }
    }

  } catch (error) {
    res.status(500).json({ error: "Token No Válido" })
  }

  next()
}