"use client";

import Enlace from "./Enlace";

// Este componente tambien es un componente del servidor, se crea la carpeta components fuera de la carpeta app, en la raiz del proyecto
// Para que este componente sea un componente del cliente, agrega en la primera linea "use client"

export default function Sidebar() {
  // Si utilizas "use client", el mensaje se imprime en la consola del navegador, porque este componente se ejecuta en el navegador
  console.log("Desde el Sidebar");

  return <Enlace />;
}
