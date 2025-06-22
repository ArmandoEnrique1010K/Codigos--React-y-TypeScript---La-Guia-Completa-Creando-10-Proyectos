// Los hooks de react funcionan solamente en componentes de cliente de Nextjs
"use client";

import { useStore } from "@/src/store";
import ProductDetails from "./ProductDetails";
import { useMemo } from "react";
import { formatCurrency } from "@/src/utils";

export default function OrderSummary() {
  // Trae el state de order, asegurate que sea el del store, no el de zustand
  const order = useStore((state) => state.order);

  // Calcula el total a pagar con la función reduce
  const total = useMemo(
    () => order.reduce((total, item) => total + item.quantity * item.price, 0),
    [order]
  );

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">Mi pedido</h1>

      {/*  Verifica si hay elementos en el state de order */}
      {order.length === 0 ? (
        <p className="text-center my-10">El carrito esta vacio</p>
      ) : (
        <div className="mt-5">
          {/* Itera sobre la orden */}
          {order.map((item) => (
            <ProductDetails key={item.id} item={item} />
          ))}

          <p className="text-2xl mt-20 text-center">
            Total a pagar: {""}
            <span className="font-bold">{formatCurrency(total)}</span>
          </p>
        </div>
      )}
    </aside>
  );
}
