import { Category } from "@prisma/client";
import Image from "next/image";

// Cuando defines los schemas de prisma, ya sea category o product, ellos tambien generan los types, toma el type de @prisma/client
type CategoryIconProps = {
  category: Category;
};

export default function CategoryIcon({ category }: CategoryIconProps) {
  return (
    <div
      className={`flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}
    >
      {/* Establece un ancho y alto en el div padre para que controle el tamaño de la imagen */}
      <div className="w-56 h-56 relative">
        {/* Nextjs tiene un componente especial para optimizar imagenes, las imagenes son pesados en sitios web, el componente tambien hace que tenga un buen performance en el proyecto, en lugar de img se utiliza Image */}
        {/* Incluye las propiedades alt para el nombre de la imagen, width y height (3 propiedades obligatorias) son las propiedades que existen en las imagenes para especificar el ancho y el alto de una imagen (en pixeles) */}
        <Image
          width={64}
          height={64}
          src={`/icon_${category.slug}.svg`}
          alt="Imagen Categoria"
        />
      </div>
      <p className="text-xl font-bold">{category.name}</p>
    </div>
  );
}
