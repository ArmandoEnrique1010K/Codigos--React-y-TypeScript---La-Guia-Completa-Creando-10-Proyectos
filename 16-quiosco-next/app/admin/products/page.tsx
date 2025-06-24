import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function getProducts(page: number, pageSize: number) {
  // Si estas en la pagina 2, se salta los primeros 10 y muestra los siguietes productos
  const skip = (page - 1) * pageSize;

  const products = await prisma.product.findMany({
    // Crea un paginador, prisma ofrece las funciones: skip y take
    // Cantidad de registros que se traera (similar a un limite en SQL)
    // take: 10,
    take: pageSize,

    // Saltea los primeros n registros
    // skip: 10,
    skip, // skip: skip

    // Controla las 2 funciones: take y skip para tener un paginador

    // Incluye los datos de la categoria
    include: {
      category: true,
    },
  });

  return products;
}

// La tercera forma es definir un type basado en el valor que retorna una función, en este caso getProducts, retorna un arreglo de productos
export type ProductWithCategory = Awaited<ReturnType<typeof getProducts>>;

// Se necesita que la URL tenga un string param
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Accede a: http://localhost:3000/admin/products?page=1
  // Imprime el valor del query string page
  // console.log(searchParams.page);

  // Espera el objeto searchParams para extraer los parámetros
  const { page = "1" } = await searchParams;

  // Convierte 'page' a número y asigna un valor predeterminado si es inválido
  const currentPage = parseInt(page as string, 10) || 1;
  const pageSize = 10;

  console.log(currentPage);

  // Obtén los productos desde la base de datos
  const products = await getProducts(currentPage, pageSize);

  // Imprime los productos en la consola
  // console.log(products);

  return (
    <>
      <Heading>Administrar Productos</Heading>

      {/* Pasa los productos como prop al componente */}
      <ProductTable products={products} />
    </>
  );
}
