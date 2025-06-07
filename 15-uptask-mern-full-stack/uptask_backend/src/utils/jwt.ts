// JSON WEB TOKEN

// Definición
// Un JSON Web Token (JWT) es un estándar abierto que define un formato compacto y seguro para trasmitir información entre 2 partes de manera segura como un objeto JSON

// Un JWT consta de 3 partes:
// Header: encabezado
// Payload: datos
// Signature: firma

/* */

// Autenticación
// Desde un formulario se envia el email y el password al backend, inicia la sesión en el servidor, esto se utiliza en aplicaciones monoliticas
// Si se separa el backend y el frontend, se tiene que enviar los datos de email y password al backend y luego debe retornar un JWT al frontend

// Autorización
// Desde el frontend se envia el JWT hacia el backend, y el backend revisa si tiene permiso, si todo esta bien retorna los datos

/* */

// Ventajas de JWT

// Seguridad: JWT utiliza algoritmos de firma digital para asegurar que los datos no han sido alterados durante la trasmision. Esto garantiza la integridad de la información y permite a las partes confiar en su validez.

// Autenticación y autorización: JWT se utiliza comunmente para autenticar usuarios y permitirles acceder a recursos protegidos. Una vez que un usuario ha sido autenticado correctamente, se le proporciona un JWT que contiene información sobre sus permisos y roles. El servidor puede verificar la validez del token y autorizar o restringir el acceso.

// Transferencia eficiente de datos: JWT es un formato compacto que se puede trasmitir facilmente a traves de diferentes medios, como encabezados HTTP, URL o incluso en el cuerpo de una solicitud HTTP. Esto lo hace adecuado para su uso en aplicaciones web y servicios de API.

// Stateless (sin estado): Los JWT son "sin estado", lo que significa que la información necesaria para autenticar y autorizar a un usuario se encuentra directamente en el token. Esto elimina la necesidad de almacenar información de sesión en el servidor, lo que facilita la escalabilidad de las aplicaciones distribuidas.

// En resumen, JWT proporciona un mecanismo seguro y eficiente para transmitir información entre dos partes, autenticar usuarios y autorizar el acceso a recursos protegidos en aplicaciones web y servicios de API. Su naturaleza compacta, seguridad y facilidad de uso lo convierten en una opción popular para la implementación de sistemas de autenticación y autorización.

/* */

// Al realizar una petición de tipo POST en el endpoint http://localhost:4000/api/auth/login, enviando el email y el password en el body, debe retornar un JWT en el caso de que las credenciales sean correctas

/* */

// Comando para instalar (en el backend) la dependencia de JWT: npm i jsonwebtoken
// Si utilizas typeScript, ejecuta tambien: npm i -D @types/jsonwebtoken

/* */

import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

type UserPayload = {
  id: Types.ObjectId,
}

// Generar el JWT
export const generateJWT = (payload: UserPayload) => {

  // No se debe colocar información sensible en un JWT como la contraseña o el numero de la tarjeta de credito, lo minimo que se debe colocar es su ID del usuario
  // const data = {
  //   name: "Juan",
  //   credit_card: "1238433293434",
  //   password: "password"
  // }

  // El metodo sign sirve para generar el JWT y verify para verificar
  // Toma 3 parametros: el payload (los datos), secret (la llave privada, se coloca en las variables de entorno) y un objeto que contiene las opciones
  // const token = jwt.sign(data, process.env.JWT_SECRET, {})

  // Pasa el payload en la generación del JWT (solamente pasa el id del usuario y lo coloca en el token)
  const token = jwt.sign(payload, process.env.JWT_SECRET, {

    // Tiempo de validez del JWT
    expiresIn: '180d' // 180 dias
    // "6m" // 6 minutos
    // "1y" // 1 año
    // "30s" // 30 segundos
    // "1h" // 1 hora
    // "1d" // 1 dia
  })

  return token

}