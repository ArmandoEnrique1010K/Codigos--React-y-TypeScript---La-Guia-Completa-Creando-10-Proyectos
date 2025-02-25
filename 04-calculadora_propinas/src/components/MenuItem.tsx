import type { MenuItem } from "../types";

// type para las props recibidas
type MenuItemProps = {
  // Objeto de tipo MenuItem
  item: MenuItem,
  // Función para agregar el item
  addItem: (item: MenuItem) => void

}

// Componente para mostrar un item del menú
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
