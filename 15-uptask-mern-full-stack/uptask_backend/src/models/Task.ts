import mongoose, { Schema, Document, Types } from "mongoose";
import Note from "./Note";

const taskStatus = {
  PENDING: 'pending',
  ON_HOLD: 'onHold',
  IN_PROGRESS: 'inProgress',
  UNDER_REVIEW: 'underReview',
  COMPLETED: 'completed'
} as const

export type TaskStatus = typeof taskStatus[keyof typeof taskStatus]

export interface ITask extends Document {
  name: string
  description: string
  project: Types.ObjectId
  status: TaskStatus
  // completedBy: Types.ObjectId  // Añade el tipo de dato para la nueva propiedad

  // Se define esta propiedad como un arreglo de objetos
  completedBy: {
    user: Types.ObjectId,
    status: TaskStatus
  }[]

  // Se almacena las notas en un arreglo
  notes: Types.ObjectId[]
}

export const TaskSchema: Schema = new Schema({
  name: {
    type: String,
    trim: true,
    require: true
  },
  description: {
    type: String,
    trim: true,
    require: true
  },
  project: {
    type: Types.ObjectId,
    ref: 'Project'
  },
  status: {
    type: String,
    enum: Object.values(taskStatus),
    default: taskStatus.PENDING
  },


  // Para tener un historial de usuarios que ha modificado el estado de la tarea, se tiene que definir este campo como un arreglo de objetos
  // Propiedad o campo para establecer quien ha completado la tarea
  completedBy: [
    {
      // Cada objeto del arreglo va a tener 2 propiedades: user y status
      user: {
        type: Types.ObjectId,
        ref: 'User', // Se almacena la referencia del usuario
        default: null // Valor por defecto
      },

      // El campo status (es el mismo que la propiedad status)
      status: {
        type: String,
        enum: Object.values(taskStatus),
        default: taskStatus.PENDING
      },
    }
  ],

  // Se añade el campo notes
  notes: [
    {
      type: Types.ObjectId,
      ref: "Note",
    }
  ]

  // La tarea se genera y el estado siempre va a ser "Pendiente", porque nadie lo ha modificado hasta ese momento
  // Cuando agregas una tarea, revisa en la base de datos que se añade el campo completedBy
}, { timestamps: true })

/* */

// Desde el frontend, si eliminas una tarea, se elimina, pero en notas (collección notes en la base de datos) se mantiene las notas referenciadas a la tarea eliminada

// Puedes utilizar un middleware de mongoose, previamente conocido como hooks, son funciones que se ejecutan despues o antes de que ocurra cualquier acción

// Middleware: https://mongoosejs.com/docs/middleware.html
// Los middlewares son propios del schema

// Antes de que se ejecute el metodo deleteOne en alguna acción
// document retorna el documento eliminado

TaskSchema.pre('deleteOne', { document: true, /* query: false */ }, async function () {
  // No debe ser una función de flecha, porque el significado de this cambia si es una función de flecha

  // Imprime el documento que se va a eliminar
  // console.log(this)

  // Imprime el id de la tarea, es un objectId
  // console.log(this._id)

  // Toma el id de la tarea
  const taskId = this._id
  if (!taskId) return;

  // Si hay un id de la tarea, borra varias notas cuya propiedad task tiene el valor de taskId (por referencia de documentos, en la base de datos, al revisar la colección tasks, cada uno de ellos tiene una propiedad llamada notes que almacena los objectId de cada tarea
  await Note.deleteMany({
    task: taskId
  })
})

// Si pasas document como false y query como true, aparece demasiada información
// TaskSchema.pre('deleteOne', { document: false, query: true }, async function () {
//   console.log(this)

//   // Imprime el id de la tarea
//   console.log(this.getQuery()._id)
// })

// El orden si importa, coloca el middleware de mongoose antes de definir el modelo
const Task = mongoose.model<ITask>('Task', TaskSchema)
export default Task
