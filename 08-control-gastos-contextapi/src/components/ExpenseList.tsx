import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"

// Componente para mostrar la lista de gastos
export default function ExpenseList() {

    // Obtiene el estado del contexto de presupuesto
    const { state } = useBudget()

    // Filtra los gastos según la categoría seleccionada, si no hay filtro, muestra todos
    const filteredExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses

    // Determina si la lista de gastos está vacía
    const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses])

    return (
        <div className="mt-10 bg-white shadow-lg rounded-lg p-10">
            {/* Muestra un mensaje si no hay gastos registrados */}
            {isEmpty ? <p className="text-gray-600 text-2xl font-bold">No Hay Gastos</p> : (
                <>
                    <p className="text-gray-600 text-2xl font-bold my-5">Listado de Gastos.</p>
                    {/* Renderiza cada gasto usando el componente ExpenseDetail */}
                    {filteredExpenses.map(expense => (
                        <ExpenseDetail
                            key={expense.id}
                            expense={expense}
                        />
                    ))}
                </>
            )}
        </div>
    )
}
