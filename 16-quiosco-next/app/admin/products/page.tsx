import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function getProducts() {
  const products = await prisma.product.findMany({
    // Incluye los datos de la categoria
    include: {
      category: true,
    },
  });

  return products;
}

// La tercera forma es definir un type basado en el valor que retorna una función, en este caso getProducts, retorna un arreglo de productos
export type ProductWithCategory = Awaited<ReturnType<typeof getProducts>>;

export default async function ProductsPage() {
  const products = await getProducts();

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
