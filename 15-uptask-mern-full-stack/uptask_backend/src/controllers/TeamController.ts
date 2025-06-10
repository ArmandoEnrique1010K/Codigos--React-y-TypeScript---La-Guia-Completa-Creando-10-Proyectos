import type { Request, Response } from "express"
import User from "../models/User"

// Controlador para los equipos
export class TeamMemberController {

  // Buscar miembro (usuario) por correo
  static findMemberByEmail = async (req: Request, res: Response) => {
    // Busca al primer usuario (findOne) por su correo
    const { email } = req.body

    // Solamente toma los campos necesarios (id, email y name)
    const user = await User.findOne({ email }).select('id email name')

    // Si el usuario no existe, debe mostrar un mensaje de error
    if (!user) {
      const error = new Error('Usuario No Encontrado')
      res.status(404).json({ error: error.message })
      return
    }

    res.json(user)
  }
}

// En Postman crea una nueva carpeta llamada "TEAM" para agrupar las solicitudes relacionadas con equipos