// Convierte este componente a un componente de cliente
"use client";

import { Category } from "@prisma/client";
import Image from "next/image";
// Nextjs ofrece un componente de navegación para navegar con un gran performance a traves de diferentes paginas, se llama Link
import Link from "next/link";

// Nextjs ofrece un hook useParams (similar al de React)
import { useParams } from "next/navigation";

// Cuando defines los schemas de prisma, ya sea category o product, ellos tambien generan los types, toma el type de @prisma/client
type CategoryIconProps = {
  category: Category;
};

export default function CategoryIcon({
  category /*, params */,
}: CategoryIconProps) {
  // Si imprimes los parametros de la URL muestra undefined, params no esta disponible en algunos componentes,
  // console.log(params);

  // Considera que params solamente esta disponibles en los archivos de tipo layout.tsx, page.tsx, route.tsx y generateMetadata

  // Instancia del hook useParams (solamente funciona en componentes de tipo client, se requiere añadir 'use client' para convertirlo a un componente de cliente)
  // Para tener el autocompletado de typescript, añade el generic con la propiedad del parametro de la URL
  const params = useParams<{ category: string }>();
  // console.log(params);
  // https://nextjs.org/docs/app/api-reference/functions/use-params

  // En la consola del navegador aparece multiples veces el nombre de la categoria, recuerda que este codigo se ejecuta por cada componente que se renderiza (cada categoria)

  // En la consola del servidor aparecne varios logs de consultas a la base de datos, ve hacia otra categoria y luego retorna a la misma categoria anterior y notaras que no vuelve a realizar la consulta anterior (reutiliza las consultas, cache de nextjs)

  return (
    <div
      // Verifica si la categoria seleccionada es igual a la categoria actual para aplicarle un color de fondo
      className={`${
        category.slug === params.category ? "bg-amber-400" : ""
      } flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}
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
