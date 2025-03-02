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
        // Recuerda que en el type la cantidad tiene que ser un numero, se puede tener una condición que revise si es un numero

        // e.target hace referencia al elemento del formulario, incluye todos sus atributos como name y value
        const { name, value } = e.target

        // No se puede desestructurar nameAsValue porque los elementos <select> no soportan ese atributo

        // Retorna false si el valor de name no es "amount"
        const isAmountField = ['amount'].includes(name)

        setExpense({
            ...expense,
            // Variable computarizada (busca el elemento por el valor del atributo name y escribe el valor ingresado), convierte el valor a un number si se trata del 'campo' amount del formulario
            [name]: isAmountField ? Number(value) : value
        })
    }

    // Función para el manejo de la fecha del calendario
    const handleChangeDate = (value: Value) => {
        // Actualiza el valor de date
        setExpense({
            ...expense,
            date: value
        })
    }

    // Función para enviar el formulario
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() // Previene el envio por defecto

        // validar que ningun campo tenga un string vacio
        if (Object.values(expense).includes('')) {
            setError('Todos los campos son obligatorios') // Se establece un mensaje
            return // Detiene la ejecución de la función
        }

        // Validar que no me pase del limite
        if ((expense.amount - previousAmount) > remainingBudget) {
            setError('Ese gasto se sale del presupuesto')
            return
        }

        // Si existe un ID editable, se procede a actualizar el gasto, de lo contrario, agrega el gasto
        if (state.editingId) {
            // Ejecuta la acción pasando como payload el id editable y una copia del state expense
            dispatch({
                type: 'update-expense', payload:
                    { expense: { id: state.editingId, ...expense } }
            })
        } else {
            // Ejecuta la acción pasando el objeto expense como payload
            dispatch({ type: 'add-expense', payload: { expense } })
        }

        // Reinicia el state de expense a sus valores iniciales
        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })

        // Establece el gasto anterior a 0
        setPreviousAmount(0)
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend
                className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2"
            >{state.editingId ? 'Guardar Cambios' : 'Nuevo Gasto'}</legend>

            {/* Si hay un error, renderiza el componente que contiene el mensaje de error, pasa por prop el mensaje de error */}
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
