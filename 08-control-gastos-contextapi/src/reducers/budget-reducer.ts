import { v4 as uuidv4 } from 'uuid'
import { Category, DraftExpense, Expense } from "../types"

// Definición de los tipos de acciones que puede manejar el reducer
export type BudgetActions =
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'show-modal' } |
    { type: 'close-modal' } |
    { type: 'add-expense', payload: { expense: DraftExpense } } |
    { type: 'remove-expense', payload: { id: Expense['id'] } } |
    { type: 'get-expense-by-id', payload: { id: Expense['id'] } } |
    { type: 'update-expense', payload: { expense: Expense } } |
    { type: 'reset-app' } |
    { type: 'add-filter-category', payload: { id: Category['id'] } }

// Estado global del presupuesto
export type BudgetState = {
    budget: number // Monto total del presupuesto
    modal: boolean // Estado del modal (abierto/cerrado)
    expenses: Expense[] // Lista de gastos
    editingId: Expense['id'] // ID del gasto en edición
    currentCategory: Category['id'] // Categoría actualmente seleccionada
}

// Recupera el presupuesto almacenado en localStorage o establece el valor inicial en 0
const initialBudget = (): number => {
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? +localStorageBudget : 0
}

// Recupera los gastos almacenados en localStorage o devuelve un array vacío si no existen
const localStorageExpenses = (): Expense[] => {
    const localStorageExpenses = localStorage.getItem('expenses')
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : []
}

// Estado inicial del reducer
export const initialState: BudgetState = {
    budget: initialBudget(), // Obtiene el presupuesto almacenado o inicia en 0
    modal: false, // Modal cerrado por defecto
    expenses: localStorageExpenses(), // Obtiene los gastos almacenados o un array vacío
    editingId: '', // Ningún gasto en edición al inicio
    currentCategory: '' // No hay categoría seleccionada por defecto
}

// Función auxiliar para crear un nuevo gasto con un ID único
const createExpense = (draftExpense: DraftExpense): Expense => {
    return {
        ...draftExpense, // Copia todas las propiedades del gasto temporal
        id: uuidv4() // Genera un ID único usando uuid
    }
}

// Reducer que maneja las acciones relacionadas con el presupuesto y los gastos
export const budgetReducer = (
    state: BudgetState = initialState, // Estado inicial
    action: BudgetActions // Tipo de acción que se ejecutará
) => {

    // Acción para establecer el presupuesto
    if (action.type === 'add-budget') {
        return {
            // Retorna una copia del state y se establece el presupuesto que se recibe desde el payload
            ...state,
            budget: action.payload.budget
        }
    }

    // Acción para mostrar el modal
    if (action.type === 'show-modal') {
        return {
            ...state,
            modal: true
        }
    }

    // Acción para cerrar el modal y limpiar el ID de edición
    if (action.type === 'close-modal') {
        return {
            ...state,
            modal: false,
            editingId: ''
        }
    }

    // Acción para agregar un nuevo gasto
    if (action.type === 'add-expense') {
        const expense = createExpense(action.payload.expense)

        return {
            ...state,
            expenses: [...state.expenses, expense], // Agrega el nuevo gasto a la lista
            modal: false // Cierra el modal después de agregar el gasto
        }
    }

    // Acción para eliminar un gasto por su ID
    if (action.type === 'remove-expense') {
        return {
            ...state,
            expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
        }
    }

    // Acción para obtener un gasto por su ID y habilitar la edición
    if (action.type === 'get-expense-by-id') {
        return {
            ...state,
            editingId: action.payload.id, // Guarda el ID del gasto a editar
            modal: true // Muestra el modal para editar
        }
    }

    // Acción para actualizar un gasto
    if (action.type === 'update-expense') {
        return {
            ...state,
            expenses: state.expenses.map(expense =>
                expense.id === action.payload.expense.id
                    ? action.payload.expense // Si coincide el ID, actualiza el gasto
                    : expense // Si no, mantiene el gasto sin cambios
            ),
            modal: false, // Cierra el modal después de actualizar
            editingId: '' // Limpia el ID en edición
        }
    }

    // Acción para reiniciar la aplicación
    if (action.type === 'reset-app') {
        return {
            ...state,
            budget: 0,
            expenses: []
        }
    }

    // Acción para filtrar gastos por categoria
    if (action.type === 'add-filter-category') {
        return {
            ...state,
            currentCategory: action.payload.id
        }
    }

    // Si la acción no es reconocida, devuelve el estado actual
    return state
}