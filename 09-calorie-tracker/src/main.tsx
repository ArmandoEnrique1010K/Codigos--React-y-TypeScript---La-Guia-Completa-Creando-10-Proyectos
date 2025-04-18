import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ActivityProvider } from './context/ActivityContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Envuelve ActivityProvider al componente principal, provider es de donde vienen los datos */}
    <ActivityProvider>
      <App />
    </ActivityProvider>
  </React.StrictMode>,
)
