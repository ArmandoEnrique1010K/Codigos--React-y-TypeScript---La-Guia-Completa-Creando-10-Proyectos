import { useMemo, Dispatch } from "react"
import { Activity } from "../types"
import { categories } from "../data/categories"
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { ActivityActions } from "../reducers/activity-reducer"

// Type para las props recibidas
type ActivityListProps = {
    activities: Activity[],
    // Se establece el type Dispatch con el generic ActivityActions (contiene el type de las posbiles acciones)
    dispatch: Dispatch<ActivityActions>
}

// Componente para mostrar la lista de actividades
export default function ActivityList({ activities, dispatch }: ActivityListProps) {

    // Muestra el nombre de la categoria (puede ser redundante)
    const categoryName = useMemo(() => (category: Activity['category']) => categories.map(cat => cat.id === category ? cat.name : '')
        , [activities])

    // Verifica que no haya actividades en la lista
    const isEmptyActivities = useMemo(() => activities.length === 0, [activities])

    return (
        <>
            <h2 className="text-4xl font-bold text-slate-600 text-center">
                Comida y Actividades
            </h2>

            {/* Si no hay actividades, muestra un mensaje, de lo contrario muestra la lista de actividades, itera con activities */}
            {isEmptyActivities ?
                <p className="text-center my-5">No hay actividades aún...</p> :
                activities.map(activity => (
                    // No olvidar el key
                    <div key={activity.id} className="px-5 py-10 bg-white mt-5 flex justify-between shadow">
                        <div className="space-y-2 relative">
                            {/* Se asigna un estilo dinamico que depende del valor de la propiedad category, como hay 2 valores se puede usar un operador ternario */}
                            <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold 
                            ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                                {/* Utiliza el signo + para convertir de string a number */}
                                {categoryName(+activity.category)}
                            </p>
                            <p className="text-2xl font-bold pt-5">{activity.name}</p>
                            <p className="font-black text-4xl text-lime-500">
                                {activity.calories} {''}
                                <span>Calorias</span>
                            </p>
                        </div>

                        <div className="flex gap-5 items-center">

                            {/* Botón para seleccionar una actividad por su ID (el fin es editarlo) */}
                            <button
                                // Ejecuta el dispatch con el type "set-activeId" (id activo), pasa como payload en el campo id el valor de activity.id
                                onClick={() => dispatch({ type: "set-activeId", payload: { id: activity.id } })}
                            >
                                {/* Componente de Hero Icon, un lapiz dentro de un cuadrado */}
                                <PencilSquareIcon
                                    className="h-8 w-8 text-gray-800"
                                />
                            </button>

                            {/* Botón para eliminar una actividad por su ID */}
                            <button
                                // Ejecuta el dispatch con el type "delete-activity", pasa como payload en el campo id el valor de activity.id
                                onClick={() => dispatch({ type: "delete-activity", payload: { id: activity.id } })}
                            >
                                {/* Componente de Hero Icon, un aspa dentro de un circulo */}
                                <XCircleIcon
                                    className="h-8 w-8 text-red-500"
                                />
                            </button>
                        </div>
                    </div>
                ))}
        </>
    )
}
