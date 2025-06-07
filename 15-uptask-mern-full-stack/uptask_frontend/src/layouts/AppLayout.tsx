import { Link, Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "@/components/Logo";
import NavMenu from "@/components/NavMenu";
import { useAuth } from "@/hooks/useAuth";

export default function AppLayout() {
  // Importa el custom hook
  const { data, isError, isLoading } = useAuth();

  // Si el usuario ha iniciado sesión, debe imprimir los datos del usuario, y 2 veces false (sin considerar el doble renderizado de React)
  console.log(data);
  console.log(isError);
  console.log(isLoading);

  // Si esta cargando, retorna un mensaje
  if (isLoading) return "Cargando...";

  // Si hay un error, redirige al usuario hacia la pagina de login
  if (isError) {
    return <Navigate to="/auth/login" />;
  }

  // Si hay un AUTH_TOKEN en uno de los keys de localStorage, mostrara la pagina de proyectos, en http://localhost:5173/, pero si no hay o el token es invalido, el usuario tendra que iniciar sesión y luego navegar manualmente hacia http://localhost:5173/

  return (
    <>
      <header className="bg-gray-800 py-5">
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="w-64">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <NavMenu />
        </div>
      </header>
      <section className="max-w-screen-2xl mx-auto mt-10 p-5">
        <Outlet />
      </section>
      <footer className="py-5">
        <p className="text-center">
          Todos los derechos reservados {new Date().getFullYear()}
        </p>
      </footer>

      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </>
  );
}
