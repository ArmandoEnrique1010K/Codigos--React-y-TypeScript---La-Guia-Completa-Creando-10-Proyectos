import { Dispatch, ReactNode, createContext, useMemo, useReducer } from "react";
import { ActivityActions, ActivityState, activityReducer, initialState } from "../reducers/activity-reducer";
import { categories } from "../data/categories";
import { Activity } from "../types";

// Este componente representa el contexto

// Define el tipo de las props para el proveedor del contexto
type ActivityProviderProps = {
    children: ReactNode
}

// Define la estructura del contexto, incluyendo el estado global y funciones auxiliares
type ActivityContextProps = {
    state: ActivityState,
    dispatch: Dispatch<ActivityActions>,
    caloriesConsumed: number
    caloriesBurned: number
    netCalories: number
    categoryName: (category: Activity['category']) => string[]
    isEmptyActivities: boolean
}

// Crea el contexto y especifica su tipo. Se usa `null!` para evitar valores nulos en la inicialización.
export const ActivityContext = createContext<ActivityContextProps>(null!)

// Proveedor del contexto que envuelve los componentes hijos y comparte el estado global
export const ActivityProvider = ({ children }: ActivityProviderProps) => {

    // Define el estado global usando `useReducer`, que maneja la lógica de las actividades
    const [state, dispatch] = useReducer(activityReducer, initialState)

    // Calcula las calorías consumidas (solo cuenta actividades de categoría 1)
    const caloriesConsumed = useMemo(() => state.activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [state.activities])

    // Calcula las calorías quemadas (solo cuenta actividades de categoría 2)
    const caloriesBurned = useMemo(() => state.activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [state.activities])

    // Calcula el balance neto de calorías
    const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [state.activities])

    // Obtiene el nombre de la categoría de una actividad según su ID
    const categoryName = useMemo(() =>
        (category: Activity['category']) => categories.map(cat => cat.id === category ? cat.name : '')
        , [state.activities])

    // Verifica si no hay actividades registradas
    const isEmptyActivities = useMemo(() => state.activities.length === 0, [state.activities])

    return (
        // Proporciona el contexto a los componentes hijos con el estado y funciones compartidas
        <ActivityContext.Provider value={{
            state,
            dispatch,
            caloriesConsumed,
            caloriesBurned,
            netCalories,
            categoryName,
            isEmptyActivities
        }}>
            {children}
        </ActivityContext.Provider>
    )
}

// Para utilizar este contexto, envuelve el componente principal dentro de `<ActivityProvider>` en `main.tsx`
