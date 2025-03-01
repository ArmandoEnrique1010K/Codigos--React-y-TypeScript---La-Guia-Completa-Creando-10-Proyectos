import { MenuItem, OrderItem } from "../types";

// Definición de tipos para las acciones de las ordenes
export type OrderActions =
    { type: 'add-item', payload: { item: MenuItem } } |
    { type: 'remove-item', payload: { id: MenuItem['id'] } } |
    { type: 'place-order' } |
    { type: 'add-tip', payload: { value: number } }

// Definición del tipo para el estado de la orden
export type OrderState = {
    order: OrderItem[], // Lista de ordenes
    tip: number // Propina
}

// Estado inicial de las ordenes
export const initialState: OrderState = {
    order: [],
    tip: 0
}

// Función reducer para manejar las acciones de las ordenes
export const orderReducer = (
    state: OrderState = initialState, // Estado actual
    action: OrderActions // Accion a ejecutar
) => {

    // Acción: Añadir un item a la orden
    if (action.type === 'add-item') {

        // Verifica si el item ya existe en la orden
        const itemExist = state.order.find(orderItem => orderItem.id === action.payload.item.id)

        let order: OrderItem[] = []

        if (itemExist) {
            // Si la item ya se encuentra en la orden, incrementa su cantidad (si no supera el límite)

            // Se utiliza un operador ternario en lugar de un bloque if-else
            order = state.order.map(orderItem => orderItem.id === action.payload.item.id ?
                { ...orderItem, quantity: orderItem.quantity + 1 } // Incrementa la cantidad
                :
                orderItem // Mantiene los demás items sin cambios
            )
        } else {
            // Si el item no está en la orden, lo añade con cantidad 1
            const newItem: OrderItem = { ...action.payload.item, quantity: 1 }
            order = [...state.order, newItem]
        }

        // Retorna el nuevo estado con la orden actualizada
        return {
            ...state,
            order // Equivale a order: order
        }
    }

    // Acción: Eliminar un item de la orden
    if (action.type === 'remove-item') {
        // Filtra en la orden para eliminar el item con el ID especificado
        const order = state.order.filter(item => item.id !== action.payload.id)
        return {
            ...state,
            order
        }
    }

    // Acción: Guardar orden (Elimina los items de la orden)
    if (action.type === 'place-order') {
        return {
            ...state,
            order: [], // Establece la orden como un arreglo vacío
            tip: 0 // La propina se establece en 0
        }
    }

    // Acción: Agregar propina
    if (action.type === 'add-tip') {
        // Solamente se asigna en el state el payload recibido
        const tip = action.payload.value
        return {
            ...state,
            tip
        }
    }

    // Si no se reconoce la acción, retorna el estado actual sin cambios
    return state
}