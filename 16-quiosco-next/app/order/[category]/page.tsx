import ProductCard from "@/components/products/ProductCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
async function getProducts(category: string) {
  // Obtiene todos los productos segun la categoria
  const products = await prisma.product.findMany({
    // se especifica condiciones
    where: {
      category: {
        // El campo slug de category debe tener el mismo valor que el parametro category
        slug: category,
      },
    },
  });

  return products;
}

// Puedes extraer la prop params para ver los parametros que se encuentran en la URL (no olvidar el type Promise)
export default async function OrderPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  // Imprime los parametros de la URL en un objeto
  // console.log(await params);

  // Imprime la categoria (su valor definido en slug)
  // console.log((await params).category);

  // Llama a la función e imprime los productos en consola
  const products = await getProducts((await params).category);
  // console.log(products);

  return (
    <>
      <Heading>Elige y personaliza tu pedido a continuación</Heading>
      <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-4 items-start">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

// En nextjs cada vez que mueves un archivo, abre un archivo similar que es la version cacheada del archivo modificado, solamente cierra el archivo, si cambiaste la ubicacion de page.tsx, cierra el archivo page.ts (no guardes cambios en ese ultimo archivo)

// Trata de acceder a "http://localhost:3000/order/cafe" para ver la pagina que corresponden a los productos que corresponden a la categoria de cafe (ya no existe la URL http://localhost:3000/order)

// Todas las paginas mantienen el mismo layout porque estan en el mismo segmento que order

//
