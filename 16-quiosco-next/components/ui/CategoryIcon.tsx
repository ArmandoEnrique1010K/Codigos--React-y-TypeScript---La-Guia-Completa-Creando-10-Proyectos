import { Category } from "@prisma/client";
import Image from "next/image";
// Nextjs ofrece un componente de navegación para navegar con un gran performance a traves de diferentes paginas, se llama Link
import Link from "next/link";

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
      <div className="w-16 h-16 relative">
        {/* Nextjs tiene un componente especial para optimizar imagenes, las imagenes son pesados en sitios web, el componente tambien hace que tenga un buen performance en el proyecto, en lugar de img se utiliza Image */}
        {/* Incluye las propiedades alt para el nombre de la imagen, width y height (3 propiedades obligatorias) son las propiedades que existen en las imagenes para especificar el ancho y el alto de una imagen (en pixeles) */}
        <Image
          width={64}
          height={64}
          src={`/icon_${category.slug}.svg`}
          alt="Imagen Categoria"
        />
      </div>

      {/* La prop "to" existe en React Router, en Nextjs, la prop "href" es el reemplazo de "to" */}
      {/* La URL es dinamica, segun la propiedad slug de category */}
      <Link className="text-xl font-bold" href={`/order/${category.slug}`}>
        {category.name}
      </Link>

      {/* Si haces clic en una categoria, en la vista del usuario, no se va a mostrar la pagina, aparece 404 */}
    </div>
  );
}
