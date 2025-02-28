import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid'
import { categories } from "../data/categories"
import type { Activity } from "../types"
import { ActivityActions, ActivityState } from "../reducers/activity-reducer"

// Se especifica el type para las props recibidas
type FormProps = {
  dispatch: Dispatch<ActivityActions>,
  state: ActivityState
}

// Valores iniciales para una actividad
const initialState: Activity = {
  id: uuidv4(), // La función genera el ID aleatorio
  category: 1, // ID de la categoria
  name: '',
  calories: 0
}

// Componente para el formulario de entrada de datos
export default function Form({ dispatch, state }: FormProps) {

  // Estado para la actividad
  const [activity, setActivity] = useState<Activity>(initialState)

  // ... 
  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
      setActivity(selectedActivity)
    }
  }, [state.activeId])

  // Función para gestionar el cambio en el campo asociado, el type del argumento e tiene 2 tipos de datos tal y como se muestra
  const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
    // Devuelve true si el atributo id tiene el valor 'category' o 'calories'
    const isNumberField = ['category', 'calories'].includes(e.target.id)

    // Establece en el state de activity el cambio
    setActivity({
      ...activity,
      // Variable computada, busca el campo por el valor de id y convierte el valor a un numero si isNumberField es true
      [e.target.id]: isNumberField ? +e.target.value : e.target.value
    })
  }

  // Función para verificar si es una actividad valida
  const isValidActivity = () => {

    // Desestructura las propiedades de activity
    const { name, calories } = activity

    // Devuelve un true si se cumple ambas condiciones
    return name.trim() !== '' && calories > 0
  }

  // Función para enviar el formulario, recibe un argumento que es el evento del campo asociado
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

    // Evita el comportamiento por defecto
    e.preventDefault()

    // Llama a la acción para guardar la activad, pasa activity como payload
    dispatch({ type: 'save-activity', payload: { newActivity: activity } })

    // Establece los valores iniciales en activity
    setActivity({
      ...initialState,
      id: uuidv4()
    })
  }

  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      // El evento onSubmit tiene una función para enviar el formualrio
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">Categoría:</label>
        <select
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="category"
          // En value se establece la propiedad category de activity
          value={activity.category}
          // onChange maneja cada cambio que hace el usuario en este campo del formulario, por defecto se pasa un argumento e que representa el evento asociado a este campo
          onChange={handleChange}
        >
          {
            // Itera con el arreglo de categories y muestra una opción por cada categoria
            categories.map(category => (
              <option
                key={category.id}
                // En value se establece el valor que va a contener
                value={category.id}
              >
                {category.name}
              </option>
            ))
          }
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">Actividad:</label>
        <input
          id="name"
          type="text"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
          // Se realiza el mismo procedimiento con los demás campos
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">Calorias:</label>
        <input
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Calorias. ej. 300 o 500"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
        // El texto del botón cambiara segun la categoria seleccionada
        value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
        // El botón se deshabilitara si no hay una actividad valida, los campos deben tener valores validos
        disabled={!isValidActivity()}
      />

    </form>
  )
}
