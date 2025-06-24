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
