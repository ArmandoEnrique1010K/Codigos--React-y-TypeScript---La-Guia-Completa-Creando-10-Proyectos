// Importa los datos
import { categories } from "./data/categories";
import { products } from './data/products';

// PrismaClient tiene las funciones para trabajar con la base de datos
import { PrismaClient } from '@prisma/client'

// Instancia para obtener los metodos
const prisma = new PrismaClient();

async function main() {
  try {
    // Ingresa las categorias y productos a los modelos

    // Inserta varios registros a las tablas
    await prisma.category.createMany({
      data: categories
    })

    await prisma.product.createMany({
      data: products
    })

  } catch (error) {
    console.log(error)
  }
}

// Ejecuta la función, en ambos casos se deben insertar los datos y luego desconectarse
main().then(async () => {
  await prisma.$disconnect();
}).catch(async (e) => {
  console.error(e)
  await prisma.$disconnect();
  process.exit(1)
})

// Luego realiza una modificacion en el archivo package.json, agrega la propiedad prisma

/*
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  },
*/

// Segun la documentación de Prisma, el codigo mostrado se requiere en proyectos hechos con Next.js

// Luego abre la terminal y ejecuta npx prisma db seed