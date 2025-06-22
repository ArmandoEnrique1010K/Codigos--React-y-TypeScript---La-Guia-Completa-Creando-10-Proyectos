import { XCircleIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { OrderItem } from "@/src/types";
import { formatCurrency } from "@/src/utils";
import { useStore } from "@/src/store";
import { useMemo } from "react";

type ProductDetailsProps = {
  item: OrderItem;
};

// Cantidad minima y maxima de un producto en el carrito
const MIN_ITEMS = 1;
const MAX_ITEMS = 5;

export default function ProductDetails({ item }: ProductDetailsProps) {
  // El mensaje se muestra en la consola del navegador, porque el componente padre OrderSummary es de tipo cliente ('use client'), afecta a sus componentes hijos
  // console.log(item);

  // Recuerda instalar heroicons con npm i @heroicons/react

  const increaseQuantity = useStore((state) => state.increaseQuantity);
  const decreaseQuantity = useStore((state) => state.decreaseQuantity);
  const removeItem = useStore((state) => state.removeItem);

  // Deshabilita el boton de decrementar si la cantidad del item es igual a 1, depende de item
  const disableDecreaseButton = useMemo(
    () => item.quantity === MIN_ITEMS,
    [item]
  );
  // Deshabilita el boton de incrementar si la cantidad del item es igual al maximo de items, depende de item
  const disableIncreaseButton = useMemo(
    () => item.quantity === MAX_ITEMS,
    [item]
  );

  return (
    <div className="shadow space-y-1 p-4 bg-white border-t border-gray-200 ">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <p className="text-xl font-bold">{item.name} </p>

          <button type="button" onClick={() => removeItem(item.id)}>
            <XCircleIcon className="text-red-600 h-8 w-8" />
          </button>
        </div>
        <p className="text-2xl text-amber-500 font-black">
          {formatCurrency(item.price)}
        </p>
        <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
          {/* Llama a la función decreaseQuantity pasando el id del producto */}
          <button
            type="button"
            onClick={() => decreaseQuantity(item.id)}
            // Deshabilita el boton cuando disabledDecreaseButton es true y aplica los estilos de tailwindCSS cuando disabled es true
            disabled={disableDecreaseButton}
            className="disabled:opacity-20"
          >
            <MinusIcon className="h-6 w-6" />
          </button>

          <p className="text-lg font-black ">{item.quantity}</p>

          {/* Llama a la función increaseQuantity pasando el id del producto */}
          <button
            type="button"
            onClick={() => {
              increaseQuantity(item.id);
            }}
            disabled={disableIncreaseButton}
            className="disabled:opacity-20"
          >
            <PlusIcon className="h-6 w-6" />
          </button>
        </div>
        <p className="text-xl font-black text-gray-700">
          Subtotal: {""}
          <span className="font-normal">{formatCurrency(item.subtotal)}</span>
        </p>
      </div>
    </div>
  );
}
