import { Product } from "@prisma/client";
import { formatCurrency } from "@/src/utils/index";

// Establece el type de product (generado automaticamente con prisma)
type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border-none bg-white">
      <div className="p-5">
        <h3 className="text-2xl font-bold">{product.name}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">
          {/* Aplica el formato de precio */}
          {formatCurrency(product.price)}
        </p>
      </div>
    </div>
  );
}
