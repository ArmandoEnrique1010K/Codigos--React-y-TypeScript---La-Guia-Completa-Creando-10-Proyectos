import Sidebar from "@/components/Sidebar";

export default function ProductsPage() {
  // Este mensaje se imprime en la terminal
  // Si te vas a la pagina pulsas F5, vuelve a imprimir el mensaje en la consola

  // Al pulsar F12 en el navegador, no aparece el mensaje en la consola
  console.log("Desde el servidor");

  // Los componentes y paginas por defecto le pertenecen al servidor

  // Al renderizar Sidebar, al guardar los cambios aparece que los mensajes se imprimen en la consola, primero "Desde el servidor" y luego "Desde el Sidebar"

  /* */

  return <Sidebar />;
}
