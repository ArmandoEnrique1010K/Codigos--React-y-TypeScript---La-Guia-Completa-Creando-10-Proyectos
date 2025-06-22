import { PrismaClient } from '@prisma/client'

// Ese modulo maneja las conexiones hacia prisma, si detecta una conexión global, ya no creara otras conexiones
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// https://gist.github.com/codigoconjuan/d5be3dea3a3fb38eb7bd6e2cdcb9d7f4

// De esa forma exporta el modulo prisma y ya no crea nuevas conexiones, sino que reutiliza las conexiones anteriores