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

    try {
      await project.save()
      res.send('Proyecto creado correctamente')
    } catch (error) {
      console.log(error)
    }
  }

  static getAllProjects = async (req: Request, res: Response) => {

    try {
      const projects = await Project.find({})
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