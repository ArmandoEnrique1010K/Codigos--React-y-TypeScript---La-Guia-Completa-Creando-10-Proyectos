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
    // Establece los valores del body en una instancia de note
    const note = new Note()
    // console.log(note)

    note.content = content;
    note.createdBy = req.user.id;
    note.task = req.task.id

    // Se almacena en el campo notes de task la nota
    req.task.notes.push(note.id)

    try {
      // Promesa multiple, guarda los cambios en task y guarda la nueva nota de la tarea
      await Promise.allSettled([req.task.save(), note.save()])
      res.send('Nota Creada Correctamente')
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error' })
      return
    }

    // Añade una nueva nota y en la coleccion tasks debe habe un campo notes para las notas de esa tarea
  }

  // Muestra todas las notas de la tarea
  static getTaskNotes = async (req: Request<{}, {}, INote>, res: Response) => {
    // console.log('getTaskNotes')

    try {
      const notes = await Note.find({ task: req.task.id })
      res.json(notes)
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error' })
    }
  }
}