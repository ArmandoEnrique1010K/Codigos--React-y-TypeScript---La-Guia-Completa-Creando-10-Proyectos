import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { ITask } from "./Task";
import { IUser } from "./User";

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


const Project = mongoose.model<IProject>('Project', ProjectSchema)
export default Project

