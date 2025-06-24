import Link from "next/link";

type ProductsPaginationProps = {
  page: number;
  totalPages: number;
};

// Componente para el paginador de productos
export default function ProductsPagination({
  page,
  totalPages,
}: ProductsPaginationProps) {
  // Genera un arreglo que contiene cada caracter en 'HOLA MUNDO'
  // Array.from('HOLA MUNDO')

  // Genera un arreglo de 8 elementos (undefined), _ representa cada elemento y i es el indice del arreglo
  // Array.from({ length: 8 }, (_, i) => console.log(i))
  // [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]

  // undefined se muestra porque la función de flecha no retorna nada

  // Genenra un arreglo que contiene los numeros del 1 al 8
  // Array.from({ length: 8 }, (_, i) => i + 1)
  // [1, 2, 3, 4, 5, 6, 7 , 8]

  // Genera un arreglo que contiene los numeros de paginas
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  // console.log(pages)

  return (
    <nav className="flex justify-center py-10">
      {/* Pagina anterior, la pagina actual debe ser mayor que 1 */}
      {page > 1 && (
        <Link
          href={`/admin/products?page=${page - 1}`}
          className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-insert ring-gray-300 focus:z-20 focus:outline-offset-0"
        >
          &laquo;
        </Link>
      )}

      {/* Itera con pages para mostrar los botones de paginación de cada una de las paginas */}
      {pages.map((currentPage) => (
        <Link
          key={currentPage}
          href={`/admin/products?page=${currentPage}`}
          // Aplica un estilo al boton de la pagina actual
          className={` ${
            page === currentPage && "font-black"
          } bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-insert ring-gray-300 focus:z-20 focus:outline-offset-0`}
        >
          {currentPage}
        </Link>
      ))}

      {/* Se muestra el contenido si la pagina actual es menor que el total de paginas (si llegas a la ultima pagina, no se mostrara el botón) */}
      {page < totalPages && (
        // El enlace para navegar a la siguiente pagina
        <Link
          href={`/admin/products?page=${page + 1}`}
          className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-insert ring-gray-300 focus:z-20 focus:outline-offset-0"
        >
          &raquo;
        </Link>
      )}
    </nav>
  );
}
