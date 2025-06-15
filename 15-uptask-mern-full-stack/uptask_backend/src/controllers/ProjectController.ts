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
          },
          {
            // Trae los proyectos que pertenecen al usuario que forma parte del equipo
            team: {
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

      // Si el manager no es el mismo que el usuario que fue autenticado
      // Tambien se evalua si el usuario no forma parte del equipo del proyecto
      if (project.manager.toString() !== req.user.id.toString() && !project.team.includes(req.user.id)) {
        // No se debe revelar demasiada información al usuario
        const error = new Error('Acción no valida')
        res.status(404).json({ error: error.message })
      }

      // Ve al endpoint: localhost:4000/api/projects/{projectId}, reemplaza {projectId} por el objectId de un proyecto que exista
      // No olvidar colocar en Bearer Token el JWT del usuario autenticado para mostrar la respuesta
      res.json(project)

      // Si te autenticas con otro usuario y accedes a un proyecto que no es del usuario autenticado mostrara el mensaje de error "Acción no valida"


    } catch (error) {
      console.log(error)
    }
  }

  static updateProject = async (req: Request, res: Response) => {
    // const { id } = req.params

    try {
      // const project = await Project.findById(id)

      // if (!project) {
      //   const error = new Error('Proyecto no encontrado')
      //   res.status(404).json({ error: error.message })
      // }

      // // Comprueba que sea el manager del proyecto sea el usuario autenticado para modificar el proyecto
      // if (project.manager.toString() !== req.user.id.toString()) {
      //   const error = new Error('Solo el manager puede actualizar un proyecto')
      //   res.status(404).json({ error: error.message })
      // }

      // Como project ya no existe, existe en el request (desde projectExists se almacena el project en el request), se llama a req.project
      req.project.projectName = req.body.projectName
      req.project.clientName = req.body.clientName
      req.project.description = req.body.description

      await req.project.save()

      res.send('Proyecto Actualizado')
    } catch (error) {
      console.log(error)
    }
  }

  static deleteProject = async (req: Request, res: Response) => {
    // const { id } = req.params

    try {
      // const project = await Project.findById(id)

      // if (!project) {
      //   const error = new Error('Proyecto no encontrado')
      //   res.status(404).json({ error: error.message })
      // }

      // // Comprueba que sea el manager del proyecto sea el usuario autenticado para eliminar el proyecto
      // if (project.manager.toString() !== req.user.id.toString()) {
      //   const error = new Error('Solo el manager puede eliminar un proyecto')
      //   res.status(404).json({ error: error.message })
      // }

      // Realiza el mismo procedimiento en delete
      await req.project.deleteOne()
      res.send('Proyecto Eliminado')
    } catch (error) {
      console.log(error)
    }
  }

  // No olvidar colocar el JWT del usuario autenticado en "Bearer Token" (Pestaña Auth) para realizar las solicitudes a los endpoints
}

/* */

// Si se tiene codigo repetido en express, se recomienda colocarlo en un middleware