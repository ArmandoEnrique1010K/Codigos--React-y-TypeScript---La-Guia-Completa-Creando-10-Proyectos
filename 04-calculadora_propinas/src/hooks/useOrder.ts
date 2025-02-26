import { useState } from "react"
import type { MenuItem, OrderItem } from "../types"

export default function useOrder() {

    // Estado para la orden, almacena una lista de productos con cantidad
    const [order, setOrder] = useState<OrderItem[]>([])

    // Estado para la propina
    const [tip, setTip] = useState(0)

    // Agrega un producto a la orden
    const addItem = (item: MenuItem) => {

        // Verifica que si el producto ya existe en la orden
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

    // Elimina un producto de la orden por su id
    const removeItem = (id: MenuItem['id']) => {
        setOrder(order.filter(item => item.id !== id))
    }

    // Limpia la orden y resetea la propina
    const placeOrder = () => {
        setOrder([])
        setTip(0)
    }

    return {
        order,
        tip,
        setTip, // Permite actualizar directamente el estado de la propina
        addItem,
        removeItem,
        placeOrder
    }
}