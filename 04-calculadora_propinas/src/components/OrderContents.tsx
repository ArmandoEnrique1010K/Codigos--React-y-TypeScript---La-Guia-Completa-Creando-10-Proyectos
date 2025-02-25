import { formatCurrency } from "../helpers"
import { MenuItem, OrderItem } from "../types"

// Type para las props recibidas
type OrderContentsProps = {
    // Arreglo de objetos de tipo OrderItem
    order: OrderItem[],
    // Función para eliminar el item por su id
    removeItem: (id: MenuItem['id']) => void
}

// Componente para la lista de ordenes
export default function OrderContents({ order, removeItem }: OrderContentsProps) {
    return (
        <div>
            <h2 className='font-black text-4xl'>Consumo</h2>

            <div className="space-y-3 mt-10">
                {/* Itera sobre el arreglo de order */}
                {order.map(item => (
                    <div
                        key={item.id}
                        className="flex justify-between items-center border-t border-gray-200 py-5 last-of-type:border-b"
                    >
                        <div>
                            <p className="text-lg">
                                {/* Aplica el formato de moneda definido con formatCurrency */}
                                {item.name} - {formatCurrency(item.price)}
                            </p>
                            <p className="font-black">
                                {/* Multiplica el precio por la cantidad del item */}
                                Cantidad: {item.quantity} - {formatCurrency(item.price * item.quantity)}
                            </p>
                        </div>

                        {/* Botón para eliminar la orden por su id */}
                        <button
                            className="bg-red-600 h-8 w-8 rounded-full text-white font-black"
                            onClick={() => removeItem(item.id)}
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
