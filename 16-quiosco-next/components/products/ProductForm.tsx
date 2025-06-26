import { prisma } from "@/src/lib/prisma";
import React from "react";

// Obtiene todas las categorias
// async y await solamente estan soportados en los componentes de servidor

// Un componente de servidor puede renderizar componentes de cliente, pero uno de cliente no puede renderizar componentes del servidor, a excepción de que utilices "composición"

async function getCategories() {
  return await prisma.category.findMany();
}

// Formulario para crear o editar un producto
export default async function ProductForm() {
  // Imprime las categorias en la terminal del servidor
  const categories = await getCategories();
  // console.log(categories)

  return (
    <>
      <div className="space-y-2">
        <label className="text-slate-800" htmlFor="name">
          Nombre:
        </label>
        <input
          id="name"
          type="text"
          name="name"
          className="block w-full p-3 bg-slate-100"
          placeholder="Nombre Producto"
        />
      </div>

      <div className="space-y-2">
        <label className="text-slate-800" htmlFor="price">
          Precio:
        </label>
        <input
          id="price"
          name="price"
          className="block w-full p-3 bg-slate-100"
          placeholder="Precio Producto"
        />
      </div>

      <div className="space-y-2">
        <label className="text-slate-800" htmlFor="categoryId">
          Categoría:
        </label>
        <select
          className="block w-full p-3 bg-slate-100"
          id="categoryId"
          name="categoryId"
        >
          <option value="">-- Seleccione --</option>
          {/* Itera con las categorias encontradas, en el value se coloca el valor que se enviara a la base de datos */}
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
