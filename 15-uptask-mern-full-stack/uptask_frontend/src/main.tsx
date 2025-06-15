import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import Router from "./router";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>
);

// Libreria de Drag and Drop
// Puedes arrastrar una tarea hacia un nuevo estado
// Para aquello puedes utilizar la libreria mencionada, contiene 2 hooks
// useDroppable --> es donde se va a arrastrar el elemento
// useDraggable --> el elemento que se va a rrastrar

// Contexto de Drag and Drop
// DndContext --> se registra un contexto para contener las acciones

// Instalación: ejecuta el comando: npm install @dnd-kit/core

// Documentación: https://dndkit.com/ & https://docs.dndkit.com/
// Ejemplos: https://examples.dndkit.com/, el hook useDragable tiene varias opciones

/* */

// Al momento de desplegar en Vercel, como el proyecto tiene diferentes rutas y es un single page application, se mantiene las paginas cuando recargas, para aquello se crea el archivo vercel.json en la carpeta src, (el codigo dentro del archivo es universal, se puede utilizar para cualquier proyecto desplegado en Vercel)
