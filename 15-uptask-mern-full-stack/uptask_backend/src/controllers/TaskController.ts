import type { Request, Response } from 'express'
import Task from '../models/Task'

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    try {
      const task = new Task(req.body)
      task.project = req.project.id
      req.project.tasks.push(task.id)

      await Promise.allSettled([
        task.save(),
        req.project.save()
      ])

      res.send('Tarea creada correctamente')
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error' })

    }
  }

  static getProjectTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await Task.find({
        project: req.project.id
      }).populate('project')

      res.json(tasks)
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error' })
    }
  }

  static getTaskById = async (req: Request, res: Response) => {
    try {
      res.json(req.task)

    } catch (error) {
      res.status(500).json({ error: 'Hubo un error' })
    }

  }

  static updateTask = async (req: Request, res: Response) => {

    try {
      req.task.name = req.body.name
      req.task.description = req.body.description
      await req.task.save()

      res.send("Tarea actualizada correctamente")

    } catch (error) {
      res.status(500).json({ error: 'Hubo un error' })
    }
  }

  static deleteTask = async (req: Request, res: Response) => {

    try {
      req.project.tasks = req.project.tasks.filter(task => task.toString() !== req.task.id.toString())

      await Promise.allSettled([
        req.task.deleteOne(),

        req.project.save()
      ])

      res.send("Tarea eliminada correctamente")

    } catch (error) {
      res.status(500).json({ error: 'Hubo un error' })
    }
  }

  static updateStatus = async (req: Request, res: Response) => {
    try {
      const { status } = req.body
      req.task.status = status

      // Se almacena el usuario que ha realizado la peticion en el campo completedBy
      // El usuario que esta autenticado manda a llamar este endpoint y se convierte en la persona que ha cambiado el estado de la tarea
      // req.task.completedBy = req.user.id

      // Hay un caso especial, si el estado de la tarea es pendiente, no deberia haber un usuario que ha completado la tarea
      if (status === "pending") {
        req.task.completedBy = null
      } else {
        req.task.completedBy = req.user.id
      }

      // Revisa en la base de datos que el campo completedBy de una tarea tenga un cambio, el usuario autenticado, porque el ha cambiado el estado
      // Cambia el estado de la tarea de pendiente a un nuevo estado de la tarea y viceversa (si la tarea vuelve a tener el estado "pendiente", no deberia haber un usuario que ha completado la tarea)

      await req.task.save()
      res.send('Tarea actualizada')

    } catch (error) {
      res.status(500).json({ error: 'Hubo un error' })
    }
  }

}