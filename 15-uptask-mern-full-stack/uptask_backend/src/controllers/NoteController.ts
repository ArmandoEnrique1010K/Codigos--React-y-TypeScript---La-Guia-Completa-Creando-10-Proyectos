import type { Request, Response } from 'express'
import Note, { INote } from '../models/Note';

// Controlador para las notas
export class NoteController {
  // Puedes pasarle un generic al request, lleva 3 parametros dentro del generic
  // Especifica un type en el request
  // 1°: Tipos de datos de los parametros que se pasan en la URL
  // 2°: Rest Body
  // 3°: Request Body (el contenido que se pasa en el body)
  // 4°: Request Query, los query strings en la URL, ejemplo (&orederby = ASC)
  static createNote = async (req: Request<{}, {}, INote>, res: Response) => {
    // Imprime el body
    // console.log(req.body)

    const { content } = req.body
  }

}