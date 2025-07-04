import { ProductWithCategory } from "@/app/admin/products/page";
import { formatCurrency } from "@/src/utils";
// import { Category, Product } from "@prisma/client";
import Link from "next/link";

type ProductTableProps = {
  // products: Product[];

  // Una forma es inferir el type de products (no se utiliza el de prisma, omite las relaciones hacia los campos de la otra tabla), pero la desventaja es que debes actualizar el type cada vez que haces cambios en las tablas
  // products: ({
  //   category: {
  //     name: string;
  //     id: number;
  //     slug: string;
  //   };
  // } & {
  //   name: string;
  //   id: number;
  //   price: number;
  //   image: string;
  //   categoryId: number;
  // })[];

  // Otra forma es utilizar los types de prisma
  // products: ({
  //   category: Category;
  // } & Product)[];

  // Tercera forma, utiliza el type definido en el componente padre
  products: ProductWithCategory;
};

// Tabla de productos
export default function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-20">
      <div className="mt-8 flow-root ">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 bg-white p-5 ">
            <table className="min-w-full divide-y divide-gray-300 ">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Producto
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Precio
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Categoría
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Acciones</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {product.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {formatCurrency(product.price)}
                    </td>

                    {/* No se puede autocompletar con el nombre de la categoria, prisma define los types, pero no para las relaciones entre tablas */}
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {/* {product.categoryId} */}

                      {/* Muestra el nombre de la categoria en la vista, pero no se tiene un buen autocompletado */}
                      {product.category.name}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      {/* Boton de editar, href dinamico */}
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        Editar <span className="sr-only">, {product.name}</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
