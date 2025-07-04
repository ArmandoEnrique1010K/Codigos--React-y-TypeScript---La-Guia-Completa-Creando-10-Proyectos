import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <div className="flex justify-center mt-5">
      <div className="relative w-40 h-40">
        {/* El componente Image de Next, tiene la propiedad fill es la encargada que asignar el mismo tamaño que el elemento padre a la imagen */}
        <Image fill alt="Logotipo Fresh Coffee" src="/logo.svg" />
      </div>
    </div>
  );
}
