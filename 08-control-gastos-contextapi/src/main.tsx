import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BudgetProvider } from './context/BudgetContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Envuelve la aplicación con el contexto del presupuesto */}
    {/* Esto permite que todos los componentes dentro de <App /> accedan al contexto */}
    <BudgetProvider>
      <App />
    </BudgetProvider>
  </React.StrictMode>,
)
