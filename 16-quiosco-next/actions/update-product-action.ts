"use server"

import { prisma } from "@/src/lib/prisma"
import { ProductSchema } from "@/src/schema"
import { revalidatePath } from "next/cache"

export async function updateProduct(data: unknown, id: number) {
  // console.log(data);
  // console.log(id)

  const result = ProductSchema.safeParse(data)
  if (!result.success) {
    return {
      errors: result.error.issues
    }
  }

  // update sirve para actualizar el producto, en este caso en where se le especifica el id
  await prisma.product.update({
    where: {
      id
    },
    data: result.data
  })

  // Revalida los datos cuando se va a la URL
  revalidatePath('/admin/products')
}