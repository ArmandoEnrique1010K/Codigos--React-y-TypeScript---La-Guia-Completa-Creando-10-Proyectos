// import { PrismaClient } from "@prisma/client";
import { prisma } from "@/src/lib/prisma";

// Instancia de prismaClient
// const prismaClient = new PrismaClient();

// Función que interactua con el ORM para obtener los datos, utiliza findMany para obtener todos los datos
async function getCategories() {
  // return await prismaClient.category.findMany();
  return await prisma.category.findMany();
}

// Coloca async para convertir este componente en un componente asincrono
export default async function OrderSidebar() {
  // Llama a la función, nextjs si soporta llamado de funciones asincronas (es imposible hacerlo en React, pero en nextjs si funciona)
  // Imprime en la consola del servidor las categorias
  const categories = await getCategories();
  console.log(categories);

  return <aside className="md:w-72 md:h-screen bg-white">OrderSidebar</aside>;
}

// En versiones anteriores de Next.js, cuando era unicamente pages, la función de getServerSideProps se utilizaba para obtener datos en las paginas, pero no podias hacerlo en los componentes.

// Desde que tenemos el app Router y todos los componentes son del servidor, puedes obtener datos y consultar tu ORM en cualquier página o en cualquier ruta o en cualquier componente que se ejecute en el servidor.

// Si es un componente de cliente tendrías que utilizar React Query o tendrías que utilizar SWR o también Axios, etc.

// Pero como este es un componente del servidor, podemos consultar directamente en prisma y obtener los datos
