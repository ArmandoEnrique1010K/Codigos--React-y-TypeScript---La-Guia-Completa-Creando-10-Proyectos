import { Project, TeamMember } from "../types"

// Función para verificar si el usuario es manager o no
// Retorna true o false
export const isManager = (managerId: Project['manager'], userId: TeamMember['_id']) => managerId === userId
