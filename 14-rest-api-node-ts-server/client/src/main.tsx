import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Se utiliza Router Provider y se le pasa el modulo de router como prop */}
    <RouterProvider router={router} />
  </StrictMode>
);
