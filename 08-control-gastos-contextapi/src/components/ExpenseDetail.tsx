import { useMemo } from "react"

// Importa los componentes de Swipe y la hoja de estilos
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list'

import { formatDate } from "../helpers"
import { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget"
import "react-swipeable-list/dist/styles.css"

type ExpenseDetailProps = {
    expense: Expense
}

// Componente que muestra los detalles de un gasto individual
export default function ExpenseDetail({ expense }: ExpenseDetailProps) {

    // Obtiene la función dispatch del contexto de presupuesto
    const { dispatch } = useBudget()

    // Obtiene la información de la categoría correspondiente al gasto
    const categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0], [expense])

    // Acciones al deslizar hacia la derecha (Editar gasto)
    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction
                onClick={() => dispatch({ type: 'get-expense-by-id', payload: { id: expense.id } })}
            >
                Actualizar
            </SwipeAction>
        </LeadingActions>
    )

    // Acciones al deslizar hacia la izquierda (Eliminar gasto)
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction
                onClick={() => dispatch({ type: 'remove-expense', payload: { id: expense.id } })}
                destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                maxSwipe={1}
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
                className="bg-green-500"
            >
                <div className="bg-white shadow-lg p-5 w-full border-b border-gray-200 flex gap-5 items-center">
                    <div>
                        {/* Muestra el icono de la categoría */}
                        <img
                            src={`/icono_${categoryInfo.icon}.svg`}
                            alt="icono gasto"
                            className="w-20"
                        />
                    </div>

                    <div className="flex-1 space-y-2">
                        <p className=" text-sm font-bold uppercase text-slate-500">{categoryInfo.name}</p>
                        <p>{expense.expenseName}</p>
                        <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
                    </div>

                    {/* Muestra el monto del gasto (no pasa una prop label) */}
                    <AmountDisplay
                        amount={expense.amount}
                    />

                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}
