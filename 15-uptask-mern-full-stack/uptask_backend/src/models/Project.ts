import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import Task, { ITask } from "./Task";
import { IUser } from "./User";
import Note from "./Note";

export interface IProject extends Document {
  projectName: string
  clientName: string
  description: string
  tasks: PopulatedDoc<ITask & Document>[]

  // Añade una nueva propiedad, la persona que creo el proyecto (un usuario)
  manager: PopulatedDoc<IUser & Document>

  // Añade la propiedad para el equipo asignado a un proyecto
  team: PopulatedDoc<IUser & Document>[]
}

const ProjectSchema: Schema = new Schema({
  projectName: {
    type: String,
    require: true,
    trim: true,
  },
  clientName: {
    type: String,
    require: true,
    trim: true,
  },
  description: {
    type: String,
    require: true,
    trim: true,
  },
  tasks: [
    {
      type: Types.ObjectId,
      ref: 'Task'
    }
  ],
  // Añade la propiedad manager al Schema, se relaciona con User
  manager: {
    type: Types.ObjectId,
    ref: 'User'
  },
  // Equipo de usuarios
  team: [
    {
      type: Types.ObjectId,
      ref: 'User'
    }
  ],
  // Agrega un nuevo proyecto desde el frontend para ver que se tenga esa propiedad team (inicialmente un arreglo vacio)
}, { timestamps: true })


// Agrega el middleware para eliminar las tareas que corresponden al proyecto, se define antes del modelo, de lo contrairo no funcionara
ProjectSchema.pre('deleteOne', { document: true }, async function () {
  const projectId = this._id;
  if (!projectId) return;

  // Pero, al eliminar un proyecto, se ve que las notas de las tareas se mantienen en la base de datos, porque el middleware que se encuentra en Task esta registrado con el metodo de deleteOne
  // Se tiene que eliminar las tareas y las notas.
  // Tambien debe encontrar las tareas que pertenecen al proyecto
  const tasks = await Task.find({
    project: projectId
  })

  // Itera sobre las tareas relacionadas al proyecto y elimina las notas que corresponden a esa tarea
  for (const task of tasks) {
    await Note.deleteMany({ task: task.id })
  }


  await Task.deleteMany({ project: projectId })
})


const Project = mongoose.model<IProject>('Project', ProjectSchema)
export default Project

