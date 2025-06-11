import { z } from 'zod';

/** Auth & Users */

export const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
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


/** Tasks */

export const taskStatusSchema = z.enum(["pending", "onHold", "inProgress", "underReview", "completed"])

export type TaskStatus = z.infer<typeof taskStatusSchema>

export const taskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: taskStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type Task = z.infer<typeof taskSchema>;

export type TaskFormData = Pick<Task, 'name' | 'description'>

/** Proyects */
export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
  manager: z.string(userSchema.pick({ _id: true })) // Añade la propiedad manager
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