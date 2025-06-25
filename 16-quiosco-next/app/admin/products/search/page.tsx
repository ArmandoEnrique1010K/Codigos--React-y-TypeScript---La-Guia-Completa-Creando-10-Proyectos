import Heading from "@/components/ui/Heading";

// Para ver la pagina, accede a: http://localhost:3000/admin/products/search?search=pizza

export default async function SearchPage({
  searchParams,
}: {
  searchParams: {
    search?: string;
  };
}) {
  // Imprime los parametros de la URL (solución, colocar un await)
  console.log(await searchParams);
  // El termino que se ha buscado (muestra un error en la consola del servidor, parece que no hay solución)
  // console.log(await searchParams.search);

  return (
    <>
      <Heading>Resultados de búsqueda</Heading>
    </>
  );
}
