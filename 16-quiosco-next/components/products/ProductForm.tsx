import { prisma } from "@/src/lib/prisma";
import React from "react";
import ImageUpload from "./ImageUpload";
import { Product } from "@prisma/client";

// Obtiene todas las categorias
// async y await solamente estan soportados en los componentes de servidor

// Un componente de servidor puede renderizar componentes de cliente, pero uno de cliente no puede renderizar componentes del servidor, a excepción de que utilices "composición"

// Cuando colocas "use client" en un componente, se transformara a un componente de cliente incluyendo sus componentes hijos.

async function getCategories() {
  return await prisma.category.findMany();
}

// Pasale el type de Product de prisma (propiedad opcional)
type ProductFormProps = {
  product?: Product;
};

// Formulario para crear o editar un producto
export default async function ProductForm({ product }: ProductFormProps) {
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
          // Valor por defecto
          defaultValue={product?.name}
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
          defaultValue={product?.price}
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
          // Selecciona la categoria del producto a editar
          defaultValue={product?.categoryId}
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

      {/* Componente de subida de imagenes (pasale la imagen) */}
      <ImageUpload image={product?.image} />
    </>
  );
}
