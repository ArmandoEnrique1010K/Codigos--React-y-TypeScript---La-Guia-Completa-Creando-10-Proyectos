import { Outlet } from "react-router-dom";

export default function ProfileLayout() {
  return (
    <>
      {/* Recuerda que todo el contenido de Outlet representa el contenido que se muestra al acceder a una ruta hija del Layout */}
      <div>ProfileLayout</div>
      <Outlet />
    </>
  );
}
