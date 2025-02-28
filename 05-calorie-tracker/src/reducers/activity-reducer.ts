import { Activity } from "../types"

// Tipo de dato para cada una de las acciones se utiliza "|" para definir más de un tipo
export type ActivityActions =
    { type: 'save-activity', payload: { newActivity: Activity } } |
    { type: 'set-activeId', payload: { id: Activity['id'] } } |
    { type: 'delete-activity', payload: { id: Activity['id'] } } |
    { type: 'restart-app' }

// Type para el state
export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id']
}

// Uso de localStorage para la persistencia de datos en activities
const localStorageActivities = (): Activity[] => {
    // Recordar que si no existe el key 'activities' se establece un arreglo vacio
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

// Estado inicial
export const initialState: ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}

// Función de tipo reducer, recibe el state y la action como argumento
export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {

    // Utiliza un bloque if por cada acción, a diferencia de un bloque switch case.
    if (action.type === 'save-activity') {
        let updatedActivities: Activity[] = []

        // Si hay un ID activo, actualiza la actividad que coincide con el ID
        if (state.activeId) {
            updatedActivities = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity : activity)
        } else {
            // De lo contrario agrega la nueva actividad
            updatedActivities = [...state.activities, action.payload.newActivity]
        }

        // Devuelve una copia del state, se actualiza la lista de actividades y el ID activo se limpia
        return {
            ...state,
            activities: updatedActivities,
            activeId: ''
        }
    }

    // Acción para establecer el ID activo
    if (action.type === 'set-activeId') {
        return {
            ...state,
            // Se establece el id que se recibe como payload
            activeId: action.payload.id
        }
    }

    // Acción para borrar una actividad
    if (action.type === 'delete-activity') {
        return {
            ...state,
            // Elimina del arreglo la actividad cuyo id se recibe como payload
            activities: state.activities.filter(activity => activity.id !== action.payload.id)
        }
    }

    // Acción para reiniciar la aplicación
    if (action.type === 'restart-app') {
        return {
            // Se limpia el state a sus valores iniciales
            activities: [],
            activeId: ''
        }
    }

    // Normalmente se devuelve el state si no ejecuta ninguna acción
    return state
}