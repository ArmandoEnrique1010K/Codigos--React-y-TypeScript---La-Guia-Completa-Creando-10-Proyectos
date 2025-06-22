import { Product } from "@prisma/client";
import { formatCurrency } from "@/src/utils/index";
import Image from "next/image";
import AddProductButton from "./AddProductButton";

// Establece el type de product (generado automaticamente con prisma)
type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border-none bg-white ">
      {/* El componente Image sirve para mostrar una imagen */}
      <Image
        width={400}
        height={500}
        src={`/products/${product.image}.jpg`}
        alt={`Imagen plantilla ${product.name}`}
        // La prop quality establece la calidad (100 muestra imagenes pesadas, 1 muestra imagenes pixeleadas), valor recomendado: 75
        // quality={75}
      />
      <div className="p-5">
        <h3 className="text-2xl font-bold">{product.name}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">
          {/* Aplica el formato de precio */}
          {formatCurrency(product.price)}
        </p>

        {/* Si conviertes este componente a un cliente de next, hay un problema,
        solamente una parte del codigo es de cliente: el boton para agregar el
        producto, para aquello se ha creado otro componente para representar el
        boton de agregar al carrito */}
        <AddProductButton product={product} />
      </div>
    </div>
  );
}
