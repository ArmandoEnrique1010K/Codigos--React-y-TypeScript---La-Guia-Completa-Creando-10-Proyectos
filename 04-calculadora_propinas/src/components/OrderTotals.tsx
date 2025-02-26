import { useCallback } from "react"
import { OrderItem } from "../types"
import { formatCurrency } from "../helpers"

// Type para las props recibidas
type OrderTotalsProps = {
    order: OrderItem[],
    tip: number,
    placeOrder: () => void; // Función para guardar la orden, no devuelve nada
}

// Componente para mostrar el cálculo de los totales
export default function OrderTotals({ order, tip, placeOrder }: OrderTotalsProps) {

    // useCallback es un hook similar a useMemo, la diferencia es que useCallback memoriza una función y useMemo memoriza el resultado de una función

    // Cálculo del subtotal basado en los ítems de la orden, depende de order
    const subtotalAmount = useCallback(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])

    // Cálculo de la propina basado en el subtotal y el porcentaje de propina
    // Depende de tip y order porque la propina cambia si se agregan nuevos items
    const tipAmount = useCallback(() => subtotalAmount() * tip, [tip, order])

    // Cálculo del total a pagar sumando el subtotal y la propina
    const totalAmount = useCallback(() => subtotalAmount() + tipAmount(), [tip, order])

    // El arreglo de dependencias de useCallback no debe contener funciones que utilicen useCallback, ocurriria el problema del bucle infinito

    return (
        <>
            <div className="space-y-3">
                <h2 className="font-black text-2xl">Totales y Propina:</h2>
                {/* Llama a las funciones para realizar los calculos */}
                {/* {''} sirve para aplicar un espacio en blanco */}
                <p>Subtotal a pagar: {''}
                    <span className="font-bold">{formatCurrency(subtotalAmount())}</span>
                </p>
                <p>Propina: {''}
                    <span className="font-bold">{formatCurrency(tipAmount())}</span>
                </p>
                <p>Total a Pagar: {''}
                    <span className="font-bold">{formatCurrency(totalAmount())}</span>
                </p>
            </div>

            {/* Botón para guardar la orden (solamente borra los elementos de la orden) */}
            <button
                className="w-full bg-black p-3 uppercase text-white font-bold mt-10 disabled:opacity-10"
                // Deshabilita el botón si la propina es igual a 0 
                disabled={tipAmount() === 0}
                onClick={placeOrder}
            >
                Guardar Orden
            </button>
        </>
    )
}
