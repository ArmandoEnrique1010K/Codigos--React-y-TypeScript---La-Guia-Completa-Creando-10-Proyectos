import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"

// Componente para el formulario inicial del presupuesto
export default function BudgetForm() {

    // Estado local para almacenar el presupuesto ingresado por el usuario
    const [budget, setBudget] = useState(0)

    // Obtiene la función dispatch del contexto de presupuesto
    const { dispatch } = useBudget()

    // Maneja los cambios en el campo de entrada del presupuesto
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Convierte el valor ingresado de string a número utilizando valueAsNumber
        setBudget(e.target.valueAsNumber)
    }

    // Estado derivado para validar si el presupuesto ingresado es válido
    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0
    }, [budget])

    // Maneja el envío del formulario
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Despacha la acción para agregar el presupuesto al estado global
        dispatch({ type: 'add-budget', payload: { budget } })
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">
                    Definir Presupuesto
                </label>
                <input
                    id="budget"
                    type="number"
                    className="w-full bg-white border bordger-gray-200 p-2"
                    placeholder="Define tu presupuesto"
                    name="budget"
                    // Se enlaza el valor del input al estado local
                    value={budget}
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                value='Definir Presupuesto'
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-40"
                // El botón de envío se deshabilita si el presupuesto no es válido
                disabled={isValid}
            />
        </form>
    )
}
