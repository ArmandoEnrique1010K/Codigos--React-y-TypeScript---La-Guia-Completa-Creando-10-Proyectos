import { Link } from "react-router-dom";
// La pagina 404 se mostrara si hay algun error en la URL del proyecto (al cambiar el id del proyecto de forma manual en la URL)
export default function NotFound() {
  return (
    <>
      <h1 className="font-black text-center text-4xl text-white">
        Página no Encontrada
      </h1>
      <p className="mt-10 text-center text-white">
        Tal vez quieras volver a {""}
        <Link className="text-fuchsia-500" to={"/"}>
          Proyectos
        </Link>
      </p>
    </>
  );
}
