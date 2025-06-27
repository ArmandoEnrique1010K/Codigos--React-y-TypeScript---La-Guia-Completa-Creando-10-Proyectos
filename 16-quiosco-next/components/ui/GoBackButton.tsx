"use client";
import { useRouter } from "next/navigation";

export default function GoBackButton() {
  const router = useRouter();

  return (
    // Botón para ir hacia atras
    <button
      // back es un metodo para ir hacia la pagina anteriormente visitada
      onClick={() => router.back()}
      className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
    >
      Volver
    </button>
  );
}
