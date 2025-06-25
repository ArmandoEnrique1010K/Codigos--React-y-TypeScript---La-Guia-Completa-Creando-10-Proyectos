import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

// Función para buscar los productos por un termino de busqueda
async function searchProducts(searchTerm: string) {
  const products = await prisma.product.findMany({
    where: {
      // Buscar por nombre
      name: {
        // https://www.prisma.io/docs/orm/prisma-client/queries/filtering-and-sorting#filter-conditions-and-operators
        // Debe contener la palabra en el campo (filtro)
        contains: searchTerm,
        // El conteido no es sensible a mayusculas y minusculas
        mode: "insensitive",

        // equals --> el termino debe ser exactamente igual
        // not --> registros que no sean iguales a...
        // in --> listado de busqueda (por un arreglo de terminos)
      },
    },

    // Incluye los datos de la categoria
    include: {
      category: true,
    },
  });

  return products;
}

// En versiones recientes de NextJS se utiliza una promesa en searchParams
// Para ver la pagina, accede a: http://localhost:3000/admin/products/search?search=pizza
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) {
  // Imprime los parametros de la URL (solución, colocar un await)
  console.log(await searchParams);

  // El termino que se ha buscado (debes utilizar un await)
  const search = (await searchParams).search;
  console.log(search);

  const products = await searchProducts(search);

  return (
    <>
      <Heading>Resultados de búsqueda: {search}</Heading>
      <div className="flex flex-col lg:flex-row lg:justify-end gap-5">
        <ProductSearchForm />
      </div>

      {products.length ? (
        <ProductTable products={products} />
      ) : (
        <p className="text-center text-lg">No hay resultados</p>
      )}
    </>
  );
}
