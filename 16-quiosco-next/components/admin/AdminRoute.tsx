"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type AdminRouteProps = {
  link: {
    url: string;
    text: string;
    blank: boolean;
  };
};

export default function AdminRoute({ link }: AdminRouteProps) {
  // Obtiene la URL actual
  const pathname = usePathname();
  const isActive = pathname.startsWith(link.url);

  return (
    // Muestra un boton para navegar
    <Link
      // Resalta la pagina actual segun isActive
      className={`${
        isActive ? "bg-amber-400" : ""
      } font-bold text-lg border-t border-gray-200 p-3 last-of-type:border-b`}
      href={link.url}
      // Abre en una nueva pestaña la pagina si link.blank es true
      target={link.blank ? "_blank" : ""}
    >
      {link.text}
    </Link>
  );
}
