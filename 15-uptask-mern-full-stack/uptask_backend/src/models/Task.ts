import mongoose, { Schema, Document, Types } from "mongoose";

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
  ]

  // La tarea se genera y el estado siempre va a ser "Pendiente", porque nadie lo ha modificado hasta ese momento
  // Cuando agregas una tarea, revisa en la base de datos que se añade el campo completedBy
}, { timestamps: true })

const Task = mongoose.model<ITask>('Task', TaskSchema)
export default Task
