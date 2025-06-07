import type { Request, Response } from "express"
import Project from "../models/Project"

export class ProjectController {

  static createProject = async (req: Request, res: Response) => {

    const project = new Project(req.body)

    // Imprime los datos del usuario
    // console.log(req.user)

    // Posible valor:
    /*
    {
      _id: new ObjectId('6820d84abac58cdf41a11c1c'),
      email: 'admin@correo.com',
      name: 'Armando Enrique'
    }
    */

    // Añade el usuario que ha iniciado sesión al project.manager
    project.manager = req.user.id

    // Recordar que al agregar un nuevo proyecto por medio de la URL en postman localhost:4000/api/projects, tambien debes colocar un token del usuario que ha iniciado sesión (en el endpoint: localhost:4000/api/auth/login, genera un nuevo token)

    // Puedes comprobar en MongoDB Compass que en la colección projects, la propiedad "manager" contiene el ObjectId del usuario que ha iniciado sesión (Recuerda que se obtiene desde el JWT) 

    /* */

    // Autenticación y Autorización

    // Son dos procesos fundamentales en la seguridad de sistemas y aplicaciones, que a menudo se confunden, pero tienen propositos distintos

    // Autenticación

    // Es el proceso de verificar la identidad del usuario o entidad. Se trata de asegurarse de que el usuario es realmente quien dice ser.
    // Esto se hace típicamente a través de credenciales como nombres de usuario y contraseñas, tokens de seguridad, reconocimiento biométrico (como huellas dactilares o reconocimiento facial), entre otros
    // La autenticación responde a la pregunta: "¿Eres realmente quien dices ser?"

    // Autorización

    // Una vez que la identidad del usuario ha sido verificada mediante la autenticación, la autorización es el proceso de determinar si se le debe permitir acceder a recursos o realizar ciertas acciones.
    // Esto implica verificar sus permisos y roles en el sistema. Por ejemplo, en una empresa, un empleado puede estar autenticado (el sistema sabe quien es) pero puede o no estar autorizado para acceder a ciertos archivos o aplicaciones, dependiendo de su rol o permisos asignados.
    // La autorización responde a la pregunta: ¿Tienes permiso para hacer esto?

    // En resumen la autenticación es sobre verificar quien eres, mientras que la autorización es sobre qué te permite hacer.

    /* */

    // Realiza lo siguiente
    // Ten 2 usuarios registrados, si no lo tienes:
    // 1. Crea un nuevo usuario: localhost:4000/api/auth/create-account
    // 2. Confirma el token localhost:4000/api/auth/confirm-account
    // 3. Inicia sesión y obten el JWT: localhost:4000/api/auth/login

    // Luego crea proyectos asignados a cada usuario, minimo 2 de cada uno (no olvidar colocar el JWT al iniciar sesion en Bearer Token)

    try {
      await project.save()
      res.send('Proyecto creado correctamente')
    } catch (error) {
      console.log(error)
    }
  }

  // No deberia traer todos los proyectos de todos los usuarios
  static getAllProjects = async (req: Request, res: Response) => {

    try {
      const projects = await Project.find({
        // Realiza ciertas condiciones 
        $or: [
          {
            // Trae los proyectos que pertenecen al usuario que esta autenticado (iniciado sesión)
            manager: {
              $in: req.user.id
            }
          }
        ]

        // Esta funcionalidad va a servir en el frontend
      })
      res.json(projects)
    } catch (error) {
      console.log(error)
    }
  }

  static getProjectById = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
      const project = await Project.findById(id).populate('tasks')

      if (!project) {
        const error = new Error('Proyecto no encontrado')
        res.status(404).json({ error: error.message })
      }

      res.json(project)
    } catch (error) {
      console.log(error)
    }
  }

  static updateProject = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
      const project = await Project.findById(id)

      if (!project) {
        const error = new Error('Proyecto no encontrado')
        res.status(404).json({ error: error.message })
      }

      project.projectName = req.body.projectName
      project.clientName = req.body.clientName
      project.description = req.body.description

      await project.save()

      res.send('Proyecto Actualizado')
    } catch (error) {
      console.log(error)
    }
  }

  static deleteProject = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
      const project = await Project.findById(id)

      if (!project) {
        const error = new Error('Proyecto no encontrado')
        res.status(404).json({ error: error.message })
      }

      await project.deleteOne()
      res.send('Proyecto Eliminado')
    } catch (error) {
      console.log(error)
    }
  }

}