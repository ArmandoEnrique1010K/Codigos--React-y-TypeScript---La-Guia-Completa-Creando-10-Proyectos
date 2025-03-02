import { useEffect, useMemo } from "react"
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"
import FilterByCategory from "./components/FilterByCategory"

function App() {
  // Instancia del custom hook useBudget
  const { state } = useBudget()

  // Determina si el presupuesto es válido (mayor que 0) utilizando useMemo para evitar cálculos innecesarios en cada renderizado.
  const isValidBudget = useMemo(() => state.budget > 0, [state.budget])

  // Efecto secundario para almacenar el presupuesto y los gastos en localStorage cada vez que el state cambia.
  useEffect(() => {
    // Guarda el presupuesto en localStorage
    localStorage.setItem('budget', state.budget.toString())
    // Guarda la lista de gastos en localStorage en formato JSON
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state]) // Se ejecuta cada vez que cambia el estado del presupuesto o los gastos.

  return (
    <>
      {/* Cabecera de la aplicación */}
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">
          Planificador de Gastos
        </h1>
      </header>

      {/* Si el presupuesto es válido, muestra el rastreador de presupuesto. De lo contrario, muestra el formulario para establecer el presupuesto. */}
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
      </div>

      {/* Si el presupuesto es válido, muestra las secciones principales:
          - Filtro por categoría
          - Lista de gastos
          - Ventana modal para agregar o editar gastos */}
      {isValidBudget && (
        <main className="max-w-3xl mx-auto py-10">
          <FilterByCategory />
          <ExpenseList />
          <ExpenseModal />
        </main>
      )}
    </>
  )
}

export default App
