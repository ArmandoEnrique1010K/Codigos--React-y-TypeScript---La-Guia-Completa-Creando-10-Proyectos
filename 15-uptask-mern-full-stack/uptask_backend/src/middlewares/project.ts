import type { Request, Response, NextFunction } from 'express'
import Project from '../models/Project'
import { IProject } from '../models/Project';

declare global {
  namespace Express {
    interface Request {
      project: IProject
    }
  }
}

// Revisa si el proyecto existe, si es correcto, pasa al siguiente middleware
export async function projectExists(req: Request, res: Response, next: NextFunction) {
  try {

    const { projectId } = req.params
    const project = await Project.findById(projectId)

    if (!project) {
      const error = new Error('Proyecto no encontrado')
      res.status(404).json({ error: error.message })
      return
    }

    req.project = project
    next()

  } catch (error) {
    res.status(500).json({ error: 'Hubo un error' })
  }
}