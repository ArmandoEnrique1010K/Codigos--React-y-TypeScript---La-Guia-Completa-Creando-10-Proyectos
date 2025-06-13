import type { Request, Response } from "express"
import User from "../models/User"
import { checkPassword, hashPassword } from "../utils/auth"
import { generateToken } from "../utils/token"
import Token from "../models/Token"
import { AuthEmail } from "../email/AuthEmail"
import { generateJWT } from "../utils/jwt"

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    try {
      const { password, email } = req.body

      const userExists = await User.findOne({ email })
      if (userExists) {
        const error = new Error('El usuario ya está registrado')
        res.status(409).json({ error: error.message })
        return
      }

      const user = new User(req.body)
      user.password = await hashPassword(password)

      const token = new Token()
      token.token = generateToken()
      token.user = user.id

      AuthEmail.sendConfirmationEmail({
        email: user.email,
        name: user.name,
        token: token.token,
      })

      await Promise.allSettled([user.save(), token.save()])

      res.send('Cuenta creada, revisa tu email para confirmarla')
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" })
    }
  }


  static confirmAccount = async (req: Request, res: Response) => {
    try {
      const { token } = req.body

      const tokenExists = await Token.findOne({ token })

      if (!tokenExists) {
        const error = new Error('Token no valido')
        res.status(401).json({ error: error.message })
        return
      }

      const user = await User.findById(tokenExists.user)
      user.confirmed = true

      await Promise.allSettled([
        user.save(),
        tokenExists.deleteOne()
      ])

      res.send('Cuenta confirmada correctamente')

    } catch (error) {
      res.status(500).json({ error: "Hubo un error" })
    }
  }

  static login = async (req: Request, res: Response) => {
    try {

      const { email, password } = req.body
      const user = await User.findOne({ email })

      if (!user) {
        const error = new Error('Usuario no encontrado')
        res.status(401).json({ error: error.message })
        return
      }

      if (!user.confirmed) {
        const token = new Token()
        token.user = user.id
        token.token = generateToken()
        await token.save()

        AuthEmail.sendConfirmationEmail({
          email: user.email,
          name: user.name,
          token: token.token,
        })

        const error = new Error('La cuenta no ha sido confirmada, hemos enviado un e-mail de confirmación')
        res.status(401).json({ error: error.message })
        return
      }

      const isPasswordCorrect = await checkPassword(password, user.password)

      if (!isPasswordCorrect) {
        const error = new Error('Password Incorrecto')
        res.status(401).json({ error: error.message })
        return
      }

      // res.send('Autenticado...')

      // Generar el JWT y mostrarlo en la respuesta
      // const token = generateJWT()
      // res.send(token)

      // Requiere el ID del usuario para generar el JWT 
      const token = generateJWT({ id: user._id })
      res.send(token)

      // En Postman debe retornar una cadena que es un JWT, ejemplo:
      // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSnVhbiIsImNyZWRpdF9jYXJkIjoiMTIzODQzMzI5MzQzNCIsInBhc3N3b3JkIjoicGFzc3dvcmQiLCJpYXQiOjE3NDkyNzQzMTksImV4cCI6MTc0OTI3NDY3OX0.sYyxX2aJji3j34Pi79ML7rcI5lKzXefwNhep7rezvyc

      // Copia el codigo y ve a la pagina de JWT, en la sección Encoded
      // https://jwt.io/

      // En la parte de Decoded se mostrara decodificado el header, payload y signature

      // La firma es invalida (aparece Invalid Signature) porque no sabe cual es la palabra secreta definida en JWT_SECRET (en el archivo ".env"), copia el valor de JWT_SECRET y pegalo en la sección de la pagina que dice "your-256-bit-secret"

      // Ahora si se decodifica el token que posee el id del usuario solamente se muestra el id del usuario
      // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjBkODRhYmFjNThjZGY0MWExMWMxYyIsImlhdCI6MTc0OTI3NTUyNCwiZXhwIjoxNzQ5Mjc1ODg0fQ.7524KQYFihkXw9G3F993N4V0mow05li0wbqXi2yMGaw

      // Puedes comprobar si es el mismo ID del usuario que se encuentra en la base de datos y se vera que es el mismo ID

    } catch (error) {
      res.status(500).json({ error: "Hubo un error" })
    }
  }

  static requestConfirmationCode = async (req: Request, res: Response) => {
    try {
      const { email } = req.body
      const user = await User.findOne({ email })

      if (!user) {
        const error = new Error('El usuario no está registrado')
        res.status(404).json({ error: error.message })
        return
      }

      if (user.confirmed) {
        const error = new Error('El usuario ya está confirmado')
        res.status(409).json({ error: error.message })

      }

      const token = new Token()
      token.token = generateToken()
      token.user = user.id

      AuthEmail.sendConfirmationEmail({
        email: user.email,
        name: user.name,
        token: token.token,
      })

      await Promise.allSettled([user.save(), token.save()])

      res.send('Se envio un nuevo token a tu e-mail')
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" })
    }
  }

  static forgotPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body

      const user = await User.findOne({ email })

      if (!user) {
        const error = new Error('El usuario no está registrado')
        res.status(404).json({ error: error.message })
        return
      }

      const token = new Token()
      token.token = generateToken()
      token.user = user.id

      await token.save()

      AuthEmail.sendPasswordResetToken({
        email: user.email,
        name: user.name,
        token: token.token,
      })

      res.send('Revisa tu email para instrucciones')
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" })
    }
  }

  static validateToken = async (req: Request, res: Response) => {
    try {
      const { token } = req.body

      const tokenExists = await Token.findOne({ token })

      if (!tokenExists) {
        const error = new Error('Token no valido')
        res.status(404).json({ error: error.message })
        console.log('ERROR')
        return
      }
      res.send('Token válido. Define tu nuevo password')

    } catch (error) {
      res.status(500).json({ error: "Hubo un error" })
      return
    }
  }

  // Método estatico para obtener datos del usuario autenticado
  static user = async (req: Request, res: Response) => {
    res.json(req.user)
    return
  }

  // Actualizar perfil del usuario
  static updateProfile = async (req: Request, res: Response) => {
    const { name, email } = req.body

    // Se tiene en cuenta que como esta función se llama luego del middleware authenticate, solamente se establecen los datos porque el middleware se encarga de buscar al usuario
    req.user.name = name;
    req.user.email = email;

    // Se tiene que realizar una validación, el email debe ser unico y no debe coincidir con uno existente
    // Si solamente se quiere cambiar el nombre del usuario, validara tambien el email, es algo que se debe omitir
    const userExists = await User.findOne({ email })
    // Tambien verifica que el usuario existente no sea el mismo usuario que ha sido autenticado
    if (userExists && userExists.id.toString() !== req.user.id.toString()) {
      const error = new Error('Ese email ya esta registrado');
      res.status(409).json({ error: error.message })
      return
    }




    // Realiza los cambios en la base de datos    
    try {
      await req.user.save();
      res.send('Perfil actualizado correctamente')
    } catch (error) {
      res.status(500).send('Hubo un error')
    }

  }
}


