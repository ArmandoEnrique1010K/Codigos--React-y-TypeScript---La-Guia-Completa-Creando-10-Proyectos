// Puedes extraer la prop params para ver los parametros que se encuentran en la URL (no olvidar el type Promise)
export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  // Imprime los parametros de la URL en un objeto
  console.log(await params);

  // Imprime la categoria (su valor definido en slug)
  console.log((await params).category);

  return <div>OrderPage</div>;
}

// En nextjs cada vez que mueves un archivo, abre un archivo similar que es la version cacheada del archivo modificado, solamente cierra el archivo, si cambiaste la ubicacion de page.tsx, cierra el archivo page.ts (no guardes cambios en ese ultimo archivo)

// Trata de acceder a "http://localhost:3000/order/cafe" para ver la pagina que corresponden a los productos que corresponden a la categoria de cafe (ya no existe la URL http://localhost:3000/order)

// Todas las paginas mantienen el mismo layout porque estan en el mismo segmento que order

//
