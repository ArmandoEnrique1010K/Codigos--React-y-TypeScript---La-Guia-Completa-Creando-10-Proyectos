import { useCallback } from "react"
import { OrderItem } from "../types"
import { formatCurrency } from "../helpers"

// Type para las props recibidas
type OrderTotalsProps = {
    order: OrderItem[],
    tip: number,
    // Función para guardar la orden, no devuelve nada
    placeOrder: () => void
}

// Componente para mostrar el calculo de los totales
export default function OrderTotals({ order, tip, placeOrder }: OrderTotalsProps) {

    // useCallback es un hook similar a useMemo, la diferencia es...

    // State derivado para el calculo del subtotal
    const subtotalAmount = useCallback(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])

    // State derivado para el calculo de la propina
    const tipAmount = useCallback(() => subtotalAmount() * tip, [tip, order])

    // State derivado para el calculo del total a pagar
    const totalAmount = useCallback(() => subtotalAmount() + tipAmount(), [tip, order])

    return (
        <>
            <div className="space-y-3">
                <h2 className="font-black text-2xl">Totales y Propina:</h2>
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
                // Deshabilita el botón si el total a pagar es igual a 0 (redundante porque el componente no se muestra si no hay items en la orden)
                disabled={totalAmount() === 0}
                onClick={placeOrder}
            >
                Guardar Orden
            </button>
        </>
    )
}
