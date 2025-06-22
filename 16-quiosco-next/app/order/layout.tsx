// Todas las carpetas que estan dentro de order, van a compartir el mismo diseño

import OrderSidebar from "@/components/order/OrderSidebar";
import OrderSummary from "@/components/order/OrderSummary";
import ToastNotification from "@/components/ui/ToastNotification";

// Este codigo se obtiene desde app/layout.tsx
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // La prop children representa el contenido de las paginas web, la parte en el que se inyectara el contenido

  // Recuerda que si visitas localhost:3000/order, mostrara una pagina 404, porque hace falta definir una pagina para aquello
  return (
    <>
      <div className="md:flex">
        <OrderSidebar />

        {/* Renderiza el contenido de children, el contenido de page.tsx (de la carpeta order) */}
        <main className="md:flex-1 md:h-screen md:overflow-y-scroll p-5">
          {children}
        </main>

        {/* El resumen de la orden */}
        <OrderSummary />
      </div>

      {/* Este layout es de servidor, solamente va a estar disponible el componente de ToastNotification en los componentes que se encuentran en la carpeta de order (este layout.tsx se encuentra en la carpeta order) */}
      <ToastNotification />
    </>
  );
}
