import { useContext } from "react"
import { BudgetContext } from "../context/BudgetContext"

// Hook personalizado para acceder al contexto del presupuesto
export const useBudget = () => {

    // Usa el hook useContext para obtener el valor del contexto BudgetContext
    const context = useContext(BudgetContext)

    // Si el contexto no está disponible, se lanza un error
    // Esto asegura que el hook solo se use dentro de un BudgetProvider
    if (!context) {
        throw new Error('useBudget must be used within a BudgetProvider')
    }

    // Retorna el contexto
    // Esto permite que los componentes accedan a los valores del presupuesto sin necesidad de usar useContext directamente en cada uno
    return context
}