import { useState } from "react"
import type { MenuItem, OrderItem } from "../types"

export default function useOrder() {

    // Variable de estado para la orden, contiene un arreglo, cuyos elementos son de tipo OrderItem
    const [order, setOrder] = useState<OrderItem[]>([])

    // Variable de estado para la propina
    const [tip, setTip] = useState(0)

    // Función para agregar un item al pedido
    const addItem = (item: MenuItem) => {

        // Verifica que si el item ya existe en order
        const itemExist = order.find(orderItem => orderItem.id === item.id)

        if (itemExist) {
            // Si existe, incrementa la cantidad en 1
            const updatedOrder = order.map(orderItem => orderItem.id === item.id ?
                { ...orderItem, quantity: orderItem.quantity + 1 } :
                orderItem
            )
            setOrder(updatedOrder)
        } else {
            // De lo contrario agrega el item a la orden y establece la cantidad en 1
            const newItem = { ...item, quantity: 1 }
            setOrder([...order, newItem])
        }
    }

    // Función para eliminar un item por su id
    const removeItem = (id: MenuItem['id']) => {
        setOrder(order.filter(item => item.id !== id))
    }

    // Función para limpiar la orden (simula el envio de la orden)
    const placeOrder = () => {
        setOrder([])
        setTip(0)
    }

    return {
        order,
        tip,
        setTip, // En este caso, se pasa la función que actualiza el estado
        addItem,
        removeItem,
        placeOrder
    }
}