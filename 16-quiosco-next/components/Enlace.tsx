import React from "react";

export default function Enlace() {
  // Este mensaje no aparece en la consola del servidor, porque hay un componente de tipo cliente en el cual se renderiza este componente
  // El codigo es unidireccional

  // Los componentes hijos de un componente que es de tipo cliente (aunque no se especifique 'use client' en el componente hijo). tambien son de tipo cliente
  console.log("desde enlace");
  return <div>Enlace</div>;
}
