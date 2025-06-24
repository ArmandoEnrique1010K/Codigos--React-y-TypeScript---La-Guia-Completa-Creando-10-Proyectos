import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

// Para limitar la cantidad de paginas, debes limitar segun la cantidad de productos
async function productCount() {
  // Muestra la cantidad de productos en la base de datos
  return await prisma.product.count();
}

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

// https://nextjs.org/docs/app/api-reference/file-conventions/page

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

  // console.log(currentPage);

  // Si se introduce un valor negativo en el query string de page, mostrara un error de prisma, para aquello se redirige al usuario a la pagina de products
  // El siguiente codigo debe ir antes de hacer la petición con prisma
  if (currentPage < 0) redirect("/admin/products");

  // Obtén los productos desde la base de datos
  const productsData = getProducts(currentPage, pageSize);

  // Imprime los productos en la consola
  // console.log(products);

  // Accede a... para ver los productos (segun el paginador)
  // http://localhost:3000/admin/products?page=2
  // http://localhost:3000/admin/products?page=3

  // Cantidad de productos
  const totalProductsData = productCount();

  // Como hay 2 consultas totalmente independientes, se utiliza un Promise.all, hace que las consultas sean paralelas, que inicien al mismo tiempo, sin que espere a que una termine para ejecutar la otra (consultas independientes)
  const [products, totalProducts] = await Promise.all([
    productsData,
    totalProductsData,
  ]);

  // console.log(totalProducts);

  // Si hay 31 registros y en cada pagina se tiene 10 registros, dividiendo se obtiene 3.1 paginas, debes redondear al siguiente numero, 4 paginas en total.

  // El metodo Math.ceil(3.1) retorna 4, la función se utiliza para redondear hacia arriba, puedes cambiar pageSize para establecer la cantidad de registros por pagina
  const totalPages = Math.ceil(totalProducts / pageSize);
  // console.log(totalPages);

  // Verifica que si la pagina actual es mayor que el total de paginas, redirige al usuario a la pagina (utiliza la función redirect de next/navigation)
  if (currentPage > totalPages) redirect("/admin/products");

  return (
    <>
      <Heading>Administrar Productos</Heading>

      {/* Boton para crear producto */}
      <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
        <Link
          href={"/admin/products/new"}
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
        >
          Crear Producto
        </Link>

        <ProductSearchForm />
      </div>

      {/* Pasa los productos como prop al componente */}
      <ProductTable products={products} />

      {/* Pasale la prop de page */}
      <ProductsPagination page={currentPage} totalPages={totalPages} />
    </>
  );
}
