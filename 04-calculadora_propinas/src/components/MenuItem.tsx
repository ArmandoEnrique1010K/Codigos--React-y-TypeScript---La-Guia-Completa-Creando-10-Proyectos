import type { MenuItem } from "../types";

// Props que recibe el componente
type MenuItemProps = {
  item: MenuItem; // Objeto del menú
  addItem: (item: MenuItem) => void; // Función para agregar el item
}

// Componente para mostrar un ítem del menú
export default function MenuItem({ item, addItem }: MenuItemProps) {
  return (
    // Botón para agregar el item, llama a addItem y pasa el objeto item
    <button
      className=' border-2 border-teal-400 hover:bg-teal-200 p-3 text-lg  rounded-lg flex justify-between w-full'
      onClick={() => addItem(item)}
    >
      <p>{item.name}</p>
      <p className='font-black'>${item.price}</p>
    </button>
  )
}
