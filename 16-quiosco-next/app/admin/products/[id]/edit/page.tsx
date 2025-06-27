import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import GoBackButton from "@/components/ui/GoBackButton";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";

async function getProductById(id: number) {
  // findUnique trae un solo producto (el primero que cumpla con la condición)
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  // Si no hay un producto, se redige a...
  if (!product) {
    // pagina 404
    // redirect("/404");

    // hacia la pagina de not-found, utiliza la función de next/navigation, invoca el archivo llamado "not-found", que se encuentra en la carpeta actual
    notFound();
  }

  // Los archivos reservados de NextJs, existe un archivo que se debe llamar not-found para la pagina de error
  return product;
}

export default async function EditProductsPage({
  params,
}: {
  // Debe ser de tipo string, luego lo puedes transformar a numero
  params: Promise<{ id: string }>;
}) {
  // Resuelve la promesa de `params` antes de acceder a sus propiedades
  const { id } = await params;

  // Imprime el valor del id que se pasa como parametro en la URL
  // console.log(id);
  // console.log(typeof id);

  // Muestra los datos del producto encontrado
  const product = await getProductById(+id);
  console.log(product);

  return (
    <>
      <Heading>Editar Producto: {product.name}</Heading>

      {/* EL boton de ir hacia sirve para mantener la paginación, ejemplo: estas en la pagina 5, haces clic en el boton de editar y cuando pulsas el boton, te vas hacia atras, no redirige hacia otra pagina */}
      <GoBackButton />

      {/* Renderiza el formulario de editar, pasale la prop product */}
      <EditProductForm>
        <ProductForm product={product} />
      </EditProductForm>
    </>
  );
}
