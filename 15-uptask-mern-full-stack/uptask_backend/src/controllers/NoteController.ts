import type { Request, Response } from 'express'
import Note, { INote } from '../models/Note';
import { Types } from 'mongoose';

// Define un type para los parametros de la URL
type NoteParams = {
  noteId: Types.ObjectId
}

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

  // Eliminar una nota, se asigna un generic hacia los parametros de la URL
  static deleteNote = async (req: Request<NoteParams>, res: Response) => {
    // Toma el parametro noteId de la URL
    const { noteId } = req.params
    const note = await Note.findById(noteId)

    // Mensaje de error si no encuentra la nota
    if (!note) {
      const error = new Error('Nota no encontrada')
      res.status(404).json({ error: error.message })
      return
    }

    // Valida que el usuario que ha creado la nota sea la misma que el usuario autenticado
    if (note.createdBy.toString() !== req.user.id.toString()) {
      const error = new Error('Acción no válida')
      res.status(401).json({ error: error.message })
      return
    }

    // Tambien se tiene que eliminar la referencia de la tarea (debe ser convertido a string porque se toma objectId)
    req.task.notes = req.task.notes.filter(note => note.toString() !== noteId.toString())

    try {
      // Elimina la nota de la base de datos, se realiza una promesa doble porque tambien se guarda los cambios en task
      await Promise.allSettled([req.task.save(), note.deleteOne()]);
      res.send('Nota Eliminada')
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error' })
    }
  }
}