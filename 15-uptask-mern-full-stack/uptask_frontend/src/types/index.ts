import { z } from 'zod';

/** Proyects */
export const projectSchema = z.object({
  // MongoDB almacena el id como ObjectId, pero una vez que venga la respuesta en un JSON viene plano sin el type de ObjectId
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string()
})

// Type Project, infiere con el schema
export type Project = z.infer<typeof projectSchema>

// Pick sirve para tomar las propiedades necesarias
export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' | 'description'>