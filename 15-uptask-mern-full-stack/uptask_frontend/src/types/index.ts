import { z } from 'zod';

/** Auth & Users */

export const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  current_password: z.string(), // Añade el campo de la contraseña actual
  password: z.string(),
  password_confirmation: z.string(),
  token: z.string()
})

type Auth = z.infer<typeof authSchema>

export type UserLoginForm = Pick<Auth, "email" | "password">
export type UserRegistrationForm = Pick<Auth, "name" | "email" | "password" | "password_confirmation">
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>
export type ForgotPasswordForm = Pick<Auth, "email">
export type ConfirmToken = Pick<Auth, "token">
export type NewPasswordForm = Pick<Auth, "password" | "password_confirmation">

// Type para el formulario de perfil de usuario
export type UserProfileForm = Pick<User, 'name' | 'email'>

// Añade un type para el formulario de cambiar la contraseña
export type UpdateCurrentUserPasswordForm = Pick<Auth, 'current_password' | 'password' | 'password_confirmation'>;

// Type para el formulario de cambio de contraseña
export type CheckPasswordForm = Pick<Auth, 'password'>

/** Users */

// Schema de usuario que fue autenticado
export const userSchema = authSchema.pick({
  // Solamente se requieren 2 campos de authSchema
  name: true,
  email: true,
}).extend({
  // Hereda una nueva propiedad llamada "_id"
  _id: z.string()
})

// Infiere el tipo de dato de userSchema
export type User = z.infer<typeof userSchema>



// Una nota se encuentra dentro de una tarea, por lo cual se define antes que Tasks

/** Notes */

export const noteSchema = z.object({
  _id: z.string(),
  content: z.string(),
  createdBy: userSchema,
  task: z.string(),
  // La fecha de creación
  createdAt: z.string()
})

export type Note = z.infer<typeof noteSchema>
export type NoteFormData = Pick<Note, 'content'>

/** Tasks */

export const taskStatusSchema = z.enum(["pending", "onHold", "inProgress", "underReview", "completed"])

export type TaskStatus = z.infer<typeof taskStatusSchema>

export const taskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: taskStatusSchema,
  // Se asigna el schema de userSchema porque tiene los campos _id, name y email
  // Se añade un posible valor "null" con el metodo "or", el campo completedBy va a tener el valor  si el estado es pendiente

  // Si utilizas Valibot puede ser un poco más pesado que Zod
  // completedBy: userSchema.or(z.null()),

  // El campo completedBy ahora es de tipo array, se realiza un cambio
  completedBy: z.array(z.object({
    _id: z.string(), // Tambien se requiere el id
    user: userSchema,
    status: taskStatusSchema
  })),
  // Campo para las notas, puedes añadir más propiedades con extend
  notes: z.array(noteSchema.extend({
    createdBy: userSchema
  })),
  createdAt: z.string(),
  updatedAt: z.string(),
})

// Genera un nuevo schema
export const taskProjectSchema = taskSchema.pick({
  // Extrae las propiedades requeridas
  _id: true,
  name: true,
  description: true,
  status: true,
})

export type Task = z.infer<typeof taskSchema>;

export type TaskFormData = Pick<Task, 'name' | 'description'>

// Infiere el tipo de taskProjectSchema
export type TaskProject = z.infer<typeof taskProjectSchema>

/** Proyects */
export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
  manager: z.string(userSchema.pick({ _id: true })), // Añade la propiedad manager
  // Al llamar a las propiedades con un Pick cuando se define un type, puedes agregar nuevas propiedades al schema
  tasks: z.array(taskProjectSchema),
  // Tambien se obtiene el team
  team: z.array(z.string(userSchema.pick({ _id: true })))
})


export const dashBoardSchema = z.array(
  projectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
    manager: true // Muestra la propiedad manager
  })
)

// Añade un schema nuevo, datos de edición de un proyecto, no se incluyen las tareas
export const editProjectSchema = projectSchema.pick({
  projectName: true,
  clientName: true,
  description: true,
})

export type Project = z.infer<typeof projectSchema>

export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' | 'description'>

/** Team */

// Schema para el miembro del equipo, toma los campos de userSchema
export const teamMemberSchema = userSchema.pick({
  name: true,
  email: true,
  _id: true
})

// type para los miembros del equipo (un arreglo de teamMemberSchema)
export const teamMembersSchema = z.array(teamMemberSchema);

// type para un miembro de un equipo, lo ifniere de teamMemberSchema
export type TeamMember = z.infer<typeof teamMemberSchema>

// type para el formulario de un miembro del equipo (solamente toma el campo email)
export type TeamMemberForm = Pick<TeamMember, 'email'>