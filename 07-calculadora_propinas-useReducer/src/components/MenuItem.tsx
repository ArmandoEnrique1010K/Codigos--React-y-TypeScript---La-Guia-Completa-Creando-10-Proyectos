import { Dispatch } from "react";
import type { MenuItem } from "../types";
import { OrderActions } from "../reducers/order-reducer";

// Type para las props del componente
type MenuItemProps = {
  item: MenuItem,
  dispatch: Dispatch<OrderActions> // Función dispatch para manejar acciones del carrito
}

export default function MenuItem({ item, dispatch }: MenuItemProps) {
  return (
    // Botón para agregar un item
    <button
      className=' border-2 border-teal-400 hover:bg-teal-200 p-3 text-lg  rounded-lg flex justify-between w-full'
      // Ejecuta el dispatch para agregar el item a la orden, en el payload, se pasa el objeto item como valor de item (item: item)
      onClick={() => dispatch({ type: 'add-item', payload: { item } })}
    >
      <p>{item.name}</p>
      <p className='font-black'>${item.price}</p>
    </button>
  )
}
