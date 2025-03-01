import { Activity } from "../types"

// Definición de acciones con tipos
// Se utiliza "|" para definir más de un tipo
export type ActivityActions =
    { type: 'save-activity', payload: { newActivity: Activity } } |
    { type: 'set-activeId', payload: { id: Activity['id'] } } |
    { type: 'delete-activity', payload: { id: Activity['id'] } } |
    { type: 'restart-app' }

// Tipo de estado
export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id']
}

// Recupera las actividades guardadas en localStorage, o devuelve un array vacío si no hay datos
const localStorageActivities = (): Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

// Estado inicial con actividades almacenadas
export const initialState: ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}

// Función de tipo reducer, gestiona el estado según la acción recibida
export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {

    // Utiliza un bloque if por cada acción, a diferencia de un bloque switch-case para evaluar cada acción.

    // Acción para guardar una actividad
    if (action.type === 'save-activity') {
        let updatedActivities: Activity[] = []

        // Si hay un ID activo, actualiza la actividad que coincide con el ID
        if (state.activeId) {
            updatedActivities = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity : activity)
        } else {
            // De lo contrario agrega la nueva actividad, manteniendo las actividades existentes
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

    // Si no hay una acción válida, retorna el estado actual
    return state
}