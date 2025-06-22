// Los hooks de react funcionan solamente en componentes de cliente de Nextjs
"use client";

import { useStore } from "@/src/store";

export default function OrderSummary() {
  // Trae el state de order, asegurate que sea el del store, no el de zustand
  const order = useStore((state) => state.order);

  return (
    <aside className="lg:h-screem lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">Mi pedido</h1>

      {order.length === 0 ? (
        <p className="text-center my-10">El carrito esta vacio</p>
      ) : (
        <div className="mt-5">
          <p>Si hay algo</p>
        </div>
      )}
    </aside>
  );
}
