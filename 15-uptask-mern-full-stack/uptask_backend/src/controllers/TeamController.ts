import type { Request, Response } from "express"
import User from "../models/User"
import Project from "../models/Project"

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


  // Obtener todos los miembros de un equipo asignado a un proyecto
  static getProjectTeam = async (req: Request, res: Response) => {
    // Debe obtener el proyecto por su id
    // El metodo populate se utiliza para reemplazar los ObjectId almacenados en un campo de referencia por los documentos completos a los que hacen referencia.
    const project = await (await Project.findById(req.project.id)).populate({
      // El campo es team (contiene un arreglo con los ObjectId de los miembros)
      path: 'team',
      // Solamente selecciona esos campos
      select: 'id email name'
    })

    // En resumen, muestra los datos de cada miembro del equipo del proyecto
    res.json(project.team)
  }



  // Agregar un miembro por id
  static addMemberById = async (req: Request, res: Response) => {
    const { id } = req.body;
    // console.log(id);

    // Solamente selecciona el id del usuario
    const user = await User.findById(id).select('id')

    // Mensaje de error si no existe el usuario
    if (!user) {
      const error = new Error('Usuario No Encontrado')
      res.status(404).json({ error: error.message })
      return
    }

    // Revisa que el mismo usuario no se encuentre en el mismo proyecto (recuerda convertir los tipos de datos a string)
    if (req.project.team.some(team => team.toString() === user.id.toString())) {
      const error = new Error('El usuario ya existe en el proyecto')
      res.status(409).json({ error: error.message })
      return

      // Prueba eliminando los usuarios del proyecto desde mongoDB Compass y luego intenta agregar el mismo usuario 2 veces
    }

    // Agrega el id del usuario a la propiedad team (recuerda que se ha reescrito la interfaz global en project.ts con declare global)
    req.project.team.push(user.id)
    await req.project.save();

    // Devuelve los datos del usuario
    // res.json(user)

    // Devuelve un mensaje, En MongoDB Compass, debes asegurarte que en la propiedad team tenga el id del usuario que fue agregado al proyecto como parte del equipo
    res.send('Usuario agregado correctamente')
  }

  // Elimina a un miembro por id
  static removeMemberById = async (req: Request, res: Response) => {
    const { userId } = req.params; // Aqui debe ser param, corrige id por userId

    // No debe eliminar a un usuario que no existe en el proyecto
    if (!req.project.team.some(team => team.toString() === userId)) {
      const error = new Error('El usuario no existe en el proyecto')
      res.status(409).json({ error: error.message })
      return
    }

    // Debe eliminar al miembro por su id (dentro de la propiedad team)
    req.project.team = req.project.team.filter(teamMember => teamMember.toString() !== userId)


    await req.project.save()

    res.send('Usuario eliminado correctamente')
  }


}

// En Postman crea una nueva carpeta llamada "TEAM" para agrupar las solicitudes relacionadas con equipos