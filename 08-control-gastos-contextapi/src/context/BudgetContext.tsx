import { useReducer, createContext, Dispatch, ReactNode, useMemo } from "react"
import { BudgetActions, BudgetState, budgetReducer, initialState } from "../reducers/budget-reducer"

// Define la estructura del contexto para el presupuesto
type BudgetContextProps = {
    state: BudgetState // Estado global del presupuesto
    dispatch: Dispatch<BudgetActions> // Función para ejecutar acciones en el reducer
    totalExpenses: number
    remainingBudget: number
}

// Propiedades que recibe el proveedor del contexto
type BudgetProviderProps = {
    children: ReactNode // Elementos hijos dentro del proveedor
}

// Crea el contexto del presupuesto, inicializado con null pero será definido en el proveedor
export const BudgetContext = createContext<BudgetContextProps>(null!)


// Proveedor del contexto del presupuesto
export const BudgetProvider = ({ children }: BudgetProviderProps) => {

    // Usa useReducer para gestionar el estado global del presupuesto
    const [state, dispatch] = useReducer(budgetReducer, initialState)

    // Calcula el total de los gastos sumando los montos de todos los gastos registrados
    const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0), [state.expenses])

    // Calcula el presupuesto restante restando los gastos totales al presupuesto inicial
    const remainingBudget = state.budget - totalExpenses

    // Proporciona el estado y las funciones a los componentes que lo necesiten
    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                totalExpenses, // Expone el total de gastos
                remainingBudget // Expone el presupuesto restante
            }}
        >
            {/* Renderiza los componentes hijos dentro del proveedor */}
            {children}
        </BudgetContext.Provider>
    )
}