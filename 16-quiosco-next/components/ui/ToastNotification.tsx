// Instala la libreria de toastify con "npm i react-toastify"
"use client";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function ToastNotification() {
  // Es el componente global para mostrar o habilitar las notificaciones toast en el navegador
  return <ToastContainer />;
}
