import mongoose, { Schema, Document, Types } from "mongoose";

// Interfaz para una nota
export interface INote extends Document {
  content: string,
  createdBy: Types.ObjectId, // Relacionado hacia un usuario
  task: Types.ObjectId // Relacionado hacia una tarea
}

const NoteSchema: Schema = new Schema({
  content: {
    type: String,
    required: true, // Es requerido
  },
  // Relacion hacia user y task
  createdBy: {
    type: Types.ObjectId,
    ref: 'User',
    require: true
  },
  task: {
    type: Types.ObjectId,
    ref: 'Task',
    require: true
  },
  // Establece la fecha y hora del ultimo cambio
}, { timestamps: true })

const Note = mongoose.model<INote>('Note', NoteSchema)
export default Note