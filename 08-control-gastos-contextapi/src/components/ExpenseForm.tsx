import { ChangeEvent, useEffect, useState } from "react";
import type { DraftExpense, Value } from "../types";
import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

// Componente para el formulario de registro y edición de gastos
export default function ExpenseForm() {
    // Estado para almacenar los datos del gasto
    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date() // Inicializa con la fecha actual
    })

    // Estado para almacenar mensajes de error en el formulario
    const [error, setError] = useState('')

    // Estado para guardar el monto del gasto antes de editarlo (útil para ajustar el presupuesto)
    const [previousAmount, setPreviousAmount] = useState(0)

    // Accede al contexto del presupuesto
    const { dispatch, state, remainingBudget } = useBudget()

    // Cuando se edita un gasto, carga sus datos en el formulario
    useEffect(() => {
        if (state.editingId) {
            // Busca el gasto correspondiente en la lista de gastos
            const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0]

            setExpense(editingExpense);

            // Guarda el monto previo para recalcular el presupuesto
            setPreviousAmount(editingExpense.amount)
        }
    }, [state.editingId])

    // Maneja los cambios en los campos de texto y select del formulario
    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target // Referencia al elemento HTML asociado

        // Convierte a número si el campo es el monto del gasto
        const isAmountField = ['amount'].includes(name)

        setExpense({
            ...expense,
            [name]: isAmountField ? Number(value) : value
        })
    }

    // Maneja la selección de fecha en el DatePicker
    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    // Maneja el envío del formulario
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario

        // Validaciones de los campos
        if (!expense.expenseName.trim() || !expense.category || expense.amount <= 0) {
            setError('Todos los campos son obligatorios y la cantidad debe ser mayor a 0');
            return;
        }

        // Verifica que el gasto no supere el presupuesto disponible
        if ((expense.amount - previousAmount) > remainingBudget) {
            setError('Ese gasto se sale del presupuesto');
            return;
        }

        // Si se está editando un gasto existente, actualiza los datos
        if (state.editingId) {
            dispatch({
                type: 'update-expense',
                payload: { expense: { id: state.editingId, ...expense } }
            });
        } else {
            // Si es un gasto nuevo, lo agrega a la lista
            dispatch({ type: 'add-expense', payload: { expense } });
        }

        // Reinicia los valores del formulario después de registrar/editar un gasto
        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })

        setPreviousAmount(0); // Reinicia el monto previo
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Titulo del formulario, si hay un id editable, se cambia el texto */}
            <legend
                className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2"
            >{state.editingId ? 'Guardar Cambios' : 'Nuevo Gasto'}</legend>

            {/* Muestra un mensaje de error si hay algún problema en el formulario */}
            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="expenseName"
                    className="text-xl"
                >Nombre Gasto:</label>
                <input
                    type="text"
                    id="expenseName"
                    placeholder="Añade el Nombre del gasto"
                    className="bg-slate-100 p-2"
                    name="expenseName"
                    // Utiliza la función para manejar el cambio
                    onChange={handleChange}
                    value={expense.expenseName}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="amount"
                    className="text-xl"
                >Cantidad:</label>
                <input
                    type="number"
                    id="amount"
                    placeholder="Añade la cantaidad del gasto: ej. 300"
                    className="bg-slate-100 p-2"
                    name="amount"
                    onChange={handleChange}
                    value={expense.amount}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="category"
                    className="text-xl"
                >Categoría:</label>
                <select
                    id="category"
                    placeholder="Añade la cantaidad del gasto: ej. 300"
                    className="bg-slate-100 p-2"
                    name="category"
                    onChange={handleChange}
                    value={expense.category}
                >
                    <option value="">-- Seleccione --</option>
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}
                        >{category.name}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="date"
                    className="text-xl"
                >Fecha Gasto:</label>
                {/* Componente para mostrar el input asociado al calendario */}
                <DatePicker
                    className="bg-slate-100 p-2 border-0"
                    // En el caso de DatePicker, acepta una prop llamada value para que contenga el valor inicial (la fecha actual)
                    value={expense.date}
                    // Utiliza la función para manejar el cambio en la fecha
                    onChange={handleChangeDate}
                />
            </div>

            <input
                type="submit"
                className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
                value={state.editingId ? 'Guardar Cambios' : 'Registrar Gasto'}
            />
        </form>
    )
}
