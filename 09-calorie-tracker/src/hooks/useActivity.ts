import { useContext } from "react"
import { ActivityContext } from "../context/ActivityContext"

// Custom Hook para acceder fácilmente al contexto de actividades
export const useActivity = () => {

    // Obtiene el contexto de actividades
    const context = useContext(ActivityContext);

    // Si el contexto no está disponible, lanza un error indicando el problema
    if (!context) {
        throw new Error('el hook useActivity debe ser utilizado en un ActivityProvider')
    }

    // Este error ocurre si el componente principal <App /> no está envuelto en <ActivityProvider>

    // Retorna el contexto con el estado global y funciones compartidas
    return context;
}