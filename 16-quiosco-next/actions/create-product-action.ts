"use server"

import { prisma } from "@/src/lib/prisma"
import { ProductSchema } from "@/src/schema"

// Acción para crear un producto
export async function createProduct(data: unknown) {

  // Valida los campos
  const result = ProductSchema.safeParse(data)
  if (!result.success) {
    return {
      errors: result.error.issues
    }
  }

  // Crea el producto y lo guarda en la base de datos
  await prisma.product.create({
    data: result.data
  })
}